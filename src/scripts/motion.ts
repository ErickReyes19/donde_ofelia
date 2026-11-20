/**
 * Sistema de movimiento de Donde Ofelia (Fase 4).
 *
 * - Lenis para el scroll suave, sincronizado con el ticker de GSAP (cinematic-gsap-lenis).
 * - Una sola secuencia de entrada en el hero: el sol se dibuja en tiza, la foto "amanece",
 *   los cactus crecen y el titular sube palabra por palabra.
 * - Parallax por capas (data-speed) y dentro de las fotos (data-parallax-img).
 * - Revelado tipográfico en los titulares (data-reveal="words"), una sola vez.
 * - Microinteracciones: botón magnético, capas que siguen al puntero, papel picado que se
 *   mece con la velocidad del scroll.
 *
 * Todo se monta dentro de gsap.matchMedia(): con prefers-reduced-motion no hay Lenis, ni
 * parallax, ni entradas; el contenido queda visible y quieto. Solo se animan transform,
 * opacity, clip-path y stroke-dashoffset (una vez).
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window { __lenis?: Lenis | null }
}

const root = document.documentElement;
const EASE = 'expo.out'; // ≈ cubic-bezier(0.16, 1, 0.3, 1): ease-out fuerte (Emil Kowalski)
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) =>
  Array.from(scope.querySelectorAll<T>(sel));

/* ------------------------------------------------------------------ utilidades */

/** Envuelve cada palabra en una máscara para que "suba" desde abajo. Respeta enlaces internos. */
function splitWords(el: HTMLElement): HTMLElement[] {
  if (!el.dataset.split) {
    const walk = (node: Node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          (child.textContent ?? '').split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.append(document.createTextNode(part));
            const mask = document.createElement('span');
            const word = document.createElement('span');
            mask.className = 'word-mask';
            word.className = 'word';
            word.textContent = part;
            mask.append(word);
            frag.append(mask);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          walk(child);
        }
      });
    };
    walk(el);
    el.dataset.split = 'true';
  }
  return $$('.word', el);
}

/** Trazos de un SVG listos para dibujarse (pathLength="1" en el marcado). */
function strokes(scope: Element | null): SVGGeometryElement[] {
  if (!scope) return [];
  return $$<SVGGeometryElement>('path, circle, ellipse', scope).filter(
    (el) => el.getAttribute('pathLength') && !el.classList.contains('fill'),
  );
}

/* ------------------------------------------------------------------ Lenis */

function initLenis() {
  const headerH = parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 76;
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    anchors: { offset: -(headerH + 8) },
    autoRaf: false,
  });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis;

  // El menú móvil congela el scroll mientras está abierto
  const onMenu = (e: Event) => ((e as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start());
  window.addEventListener('menu:toggle', onMenu);

  return () => {
    window.removeEventListener('menu:toggle', onMenu);
    gsap.ticker.remove(raf);
    lenis.destroy();
    window.__lenis = null;
  };
}

/* ------------------------------------------------------------------ hero: la entrada */

function heroIntro() {
  const hero = document.getElementById('inicio');
  if (!hero) return;
  const pick = (v: string) => hero.querySelector<HTMLElement>(`[data-enter="${v}"]`);
  const all = (v: string) => $$(`[data-enter="${v}"]`, hero);

  const photo = pick('photo');
  const sun = pick('sun');
  const rays = strokes(sun?.querySelector('[data-draw="rays"]') ?? null);
  const face = strokes(sun?.querySelector('[data-draw="face"]') ?? null);
  const [ring1, ring2, ...features] = face;
  const glow = sun?.querySelector('.fill');
  const title = pick('words');
  const words = title ? splitWords(title) : [];

  const tl = gsap.timeline({ defaults: { ease: EASE } });

  // 1. La foto "amanece" de abajo hacia arriba
  if (photo) {
    tl.fromTo(photo, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4 }, 0.1)
      .fromTo(photo.querySelector('img'), { scale: 1.18 }, { scale: 1, duration: 1.8 }, 0.1);
  }
  // 2. El sol se dibuja en tiza: rayos, luego el rostro
  if (sun) {
    tl.fromTo(rays, { strokeDashoffset: 1, strokeDasharray: 1 }, { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut', stagger: 0.04 }, 0.35)
      .fromTo([ring1, ring2], { strokeDashoffset: 1, strokeDasharray: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.12 }, 0.45)
      .fromTo(features, { strokeDashoffset: 1, strokeDasharray: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', stagger: 0.035 }, 1.05);
    if (glow) tl.from(glow, { opacity: 0, duration: 1.2, ease: 'power2.out' }, 1.2);
  }
  // 3. Logo, titular palabra por palabra, texto y acciones
  tl.from(pick('fade'), { autoAlpha: 0, y: 16, filter: 'blur(6px)', duration: 1 }, 0.15)
    .from(words, { yPercent: 115, rotate: 4, transformOrigin: '0% 100%', duration: 1, stagger: 0.055 }, 0.3)
    .from(all('up'), { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.09 }, 0.7);
  // 4. Los cactus crecen, la luna se dibuja, las estrellas aparecen
  tl.fromTo(all('grow'), { clipPath: 'inset(100% 0% 0% 0%)', y: 24 }, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.14 }, 0.9);
  const moon = strokes(pick('draw'));
  if (moon.length) tl.fromTo(moon, { strokeDashoffset: 1, strokeDasharray: 1 }, { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut', stagger: 0.06 }, 0.95);
  tl.from(all('pop'), { autoAlpha: 0, scale: 0.4, rotate: -60, duration: 0.8, ease: 'back.out(1.7)', stagger: 0.12 }, 1.25);

  // Los estados iniciales ya están puestos: se puede mostrar el hero sin parpadeo
  root.classList.remove('intro');
  return () => tl.kill();
}

/* ------------------------------------------------------------------ hero: el amanecer */

/**
 * Al hacer scroll amanece: el sol sube por detrás de la foto, nace un halo dorado,
 * el cielo pasa de pizarra a aurora (índigo → terracota) y la luna y las estrellas se apagan.
 * El trazo del sol pasa de tiza a tinta oscura para leerse sobre el halo.
 * Solo transform, opacity y color; el layout no cambia en ningún tamaño.
 */
function heroSunrise(isDesktop: boolean) {
  const hero = document.getElementById('inicio');
  const wrap = hero?.querySelector<HTMLElement>('[data-sun-wrap]');
  if (!hero || !wrap) return;
  const visual = hero.querySelector<HTMLElement>('.hero-visual')!;

  // Escritorio: el hero cabe en una pantalla, así que se queda fijo (pin) mientras amanece y
  // luego sigue. Móvil: el hero es más alto que la pantalla; el amanecer ocurre mientras la foto
  // y el sol cruzan la pantalla, sin pin.
  const scrollTrigger = isDesktop
    ? { trigger: hero, start: 'top top', end: '+=75%', pin: true, anticipatePin: 1, scrub: 0.8, invalidateOnRefresh: true }
    : { trigger: visual, start: 'top 80%', end: 'bottom 35%', scrub: 0.8, invalidateOnRefresh: true };

  gsap
    .timeline({ defaults: { ease: 'none' }, scrollTrigger })
    .fromTo(wrap, { y: 0, scale: 1 }, { y: () => -wrap.offsetWidth * 0.34, scale: 1.08, duration: 1 }, 0)
    .fromTo(hero.querySelector('[data-dawn-glow]'), { autoAlpha: 0, scale: 0.3 }, { autoAlpha: 1, scale: 1, duration: 0.85, ease: 'power1.out' }, 0)
    .fromTo(hero.querySelector('[data-sky]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9 }, 0.1)
    .fromTo(hero.querySelector('[data-sun]'), { color: '#f3eee4' }, { color: '#3a1a08', duration: 0.25 }, 0.12)
    .to($$('[data-night]', hero), { autoAlpha: 0, duration: 0.4 }, 0.05);
}

/* ------------------------------------------------------------------ parallax */

function initParallax(isDesktop: boolean) {
  const factor = isDesktop ? 1 : 0.55; // más suave en móvil (scroll-experience: mobile-safe)

  // Capas: data-speed > 0 sube más rápido que el scroll; < 0 se queda atrás
  $$('[data-speed]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed || '0') * factor;
    if (!speed) return;
    // En el hero la capa parte en su lugar y se va con el scroll. En las demás secciones el
    // movimiento es simétrico: la capa está en su posición de diseño cuando su bloque está centrado.
    const hero = el.closest<HTMLElement>('[data-parallax-section="hero"]');
    const isHero = Boolean(hero);
    const trigger = hero ?? el.closest<HTMLElement>('[data-parallax-trigger]') ?? el;
    gsap.fromTo(
      el,
      { y: () => (isHero ? 0 : window.innerHeight * speed * 0.5) },
      {
        y: () => -window.innerHeight * speed * (isHero ? 1 : 0.5),
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: isHero ? 'top top' : 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      },
    );
  });

  // Fotos: la imagen se desliza dentro de su marco (el marco no se mueve)
  $$('[data-parallax-img]').forEach((el) => {
    const amp = parseFloat(el.dataset.parallaxImg || '7') * (isDesktop ? 1 : 0.7);
    gsap.fromTo(
      el,
      { yPercent: -amp },
      {
        yPercent: amp,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      },
    );
  });

  // El sol del mapa gira despacio mientras pasa la sección
  $$('[data-spin]').forEach((el) => {
    gsap.to(el, {
      rotate: parseFloat(el.dataset.spin || '60'),
      ease: 'none',
      scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    });
  });
}

/* ------------------------------------------------------------------ revelados */

function initReveals() {
  // Titulares: palabras que suben desde su línea, una sola vez
  $$('[data-reveal="words"]').forEach((el) => {
    const words = splitWords(el);
    gsap.from(words, {
      yPercent: 115,
      rotate: 3,
      transformOrigin: '0% 100%',
      duration: 1,
      ease: EASE,
      stagger: el.classList.contains('type-moment') ? 0.07 : 0.05,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Fotos que se descubren con clip-path
  $$('[data-reveal="clip"]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: EASE, scrollTrigger: { trigger: el, start: 'top 85%', once: true } },
    );
  });

  // Barras del reparto de reseñas: crecen desde la izquierda (dato, no adorno)
  $$('[data-bars]').forEach((el) => {
    gsap.from($$('.bar > span', el), {
      scaleX: 0,
      transformOrigin: '0% 50%',
      duration: 1.1,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

/* ------------------------------------------------------------------ papel picado */

function initPapelPicado(lenis: Lenis | null) {
  $$('[data-wind]').forEach((svg) => {
    const flags = $$<SVGPathElement>('[data-flag]', svg);
    flags.forEach((f) => gsap.set(f, { svgOrigin: `${f.dataset.ox} ${f.dataset.oy}` }));

    let ready = false;
    // Entrada: los banderines caen al cordel desde el centro
    gsap.from(flags, {
      y: -70,
      rotation: () => gsap.utils.random(-30, 30),
      autoAlpha: 0,
      duration: 1.2,
      ease: EASE,
      stagger: { each: 0.045, from: 'center' },
      scrollTrigger: { trigger: svg, start: 'top 92%', once: true },
      onComplete: () => (ready = true),
    });

    // Viento: se mecen según la velocidad del scroll y vuelven a su lugar al parar
    if (!lenis) return;
    const setters = flags.map((f, i) => gsap.quickTo(f, 'rotation', { duration: 0.5 + (i % 4) * 0.18, ease: 'power3.out' }));
    lenis.on('scroll', ({ velocity }: Lenis) => {
      if (!ready) return;
      const v = gsap.utils.clamp(-12, 12, velocity * 0.6);
      setters.forEach((set, i) => set(v * (i % 2 ? 1 : 0.75)));
    });
  });
}

/* ------------------------------------------------------------------ puntero (solo mouse) */

function initPointer() {
  // Capas del hero que siguen al puntero, muy poco
  $$('[data-mouse-parallax]').forEach((section) => {
    const layers = $$('[data-mouse-depth]', section).map((el) => ({
      depth: parseFloat(el.dataset.mouseDepth || '0.03'),
      x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
    }));
    section.addEventListener('pointermove', (e) => {
      const r = section.getBoundingClientRect();
      const dx = e.clientX - r.left - r.width / 2;
      const dy = e.clientY - r.top - r.height / 2;
      layers.forEach((l) => (l.x(dx * l.depth), l.y(dy * l.depth)));
    });
    section.addEventListener('pointerleave', () => layers.forEach((l) => (l.x(0), l.y(0))));
  });

  // Botón magnético (la envoltura se mueve; el botón conserva su hover y su :active)
  $$('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic || '0.2');
    const x = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * strength);
      y((e.clientY - r.top - r.height / 2) * strength);
    });
    el.addEventListener('pointerleave', () => (x(0), y(0)));
  });
}

/* ------------------------------------------------------------------ montaje */

const mm = gsap.matchMedia();
mm.add(
  {
    motion: '(prefers-reduced-motion: no-preference)',
    desktop: '(min-width: 1024px)',
    finePointer: '(hover: hover) and (pointer: fine)',
  },
  (ctx) => {
    const { motion, desktop, finePointer } = ctx.conditions as Record<string, boolean>;
    if (!motion) {
      root.classList.remove('intro');
      return;
    }
    const cleanups: (() => void)[] = [];
    try {
      cleanups.push(initLenis());
      const killIntro = heroIntro();
      if (killIntro) cleanups.push(killIntro);
      heroSunrise(desktop); // primero: su pin agrega espacio que los demás ScrollTriggers deben conocer
      initParallax(desktop);
      initReveals();
      initPapelPicado(window.__lenis ?? null);
      if (finePointer) initPointer();
    } finally {
      root.classList.remove('intro'); // nunca dejar el hero oculto si algo falla
    }
    return () => cleanups.forEach((fn) => fn());
  },
);

// Recalcular posiciones cuando cambia el alto de la página (fuentes, imágenes, pestañas del menú)
let refreshQueued = false;
const refresh = () => {
  if (refreshQueued) return;
  refreshQueued = true;
  requestAnimationFrame(() => {
    refreshQueued = false;
    ScrollTrigger.refresh();
  });
};
window.addEventListener('load', refresh);
document.fonts?.ready.then(refresh);
window.addEventListener('menu:change', refresh);
