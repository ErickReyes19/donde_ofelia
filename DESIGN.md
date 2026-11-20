# DESIGN.md — Donde Ofelia • Los Andes

> Fase 3. Sistema de diseño y arquitectura UX del sitio oficial.
> Stack: **Astro 7 + Tailwind CSS 4**, sin frameworks de UI.
> Datos e identidad: [`RESTAURANT_DATA.md`](RESTAURANT_DATA.md). Imágenes: [`ASSETS.md`](ASSETS.md).

---

## 1. Referencia UX (solo estructura)

**Sitio de referencia:** [anejotribeca.com](https://anejotribeca.com), capturado el 20 nov 2026 con el navegador integrado a 1440×900.
- Firecrawl no está configurado (falta CLI y `FIRECRAWL_API_KEY`), así que la captura se hizo a mano con el navegador.
- Captura del hero: [`.firecrawl/design-reference-anejo-hero.jpg`](.firecrawl/design-reference-anejo-hero.jpg).
- **No** se tomaron sus colores, tipografías, textos ni imágenes.

| Patrón observado en Añejo | Cómo lo adaptamos |
|---|---|
| Barra superior fija con el botón **"Reserve now"** siempre visible | Header fijo con **"Reservar mesa"** (WhatsApp) siempre a la vista. En móvil, una barra inferior con *Reservar* y *Cómo llegar*. |
| Hero de foto a pantalla completa con una frase y un CTA ("View menu") | Hero dividido: logo, h1, dato clave y CTA sobre negro; a un lado la foto real del local. **El texto nunca va encima de la foto.** |
| "Visit us": dirección, teléfono y horario justo después del hero | El horario de hoy y la dirección quedan en el hero. El bloque completo de visita va al final, junto a reservas y mapa, siguiendo el orden que pediste. |
| Bloques alternos de imagen y texto (Takeout, Our Story) | "Nuestra casa" en una franja turquesa con ilustración dorada, como la pared del local. |
| Mapa y formulario de contacto al final | Formulario que arma el mensaje de **reserva por WhatsApp**, y un mapa que se carga al hacer clic. |
| Footer con horario, contacto y redes | Footer con el logo, la dirección enlazada al mapa, horario, redes y "Pedir en línea". |

---

## 2. Concepto: "Pizarra de noche"

El local se define por tres cosas:
- El **mostrador negro con ilustración blanca tipo tiza**.
- El **logo blanco con adornos rojo y verde**.
- Los murales de **turquesa con trazo dorado**.

Un cliente lo resume así: *"las luces y la decoración hace que sea un espectáculo por la noche"*.

El sitio es esa pizarra:
- **Fondo negro**, como el logo y el mostrador.
- Ilustraciones **originales de línea** en tiza y oro (sol con rostro, luna, saguaro, nopal, agave, nubes de espiral y cerros con rayas).
- **Fotos reales** a todo color.
- **Una sola franja turquesa**, como homenaje a la pared pintada.

**Lo memorable**, la única apuesta fuerte: un **sol con rostro dibujado en tiza** que nace detrás de la foto del hero, con rayos que salen del encuadre. En la Fase 4 ese trazo se dibuja solo y las capas tienen parallax. Todo lo demás es sobrio.

> Las ilustraciones son **dibujos propios** inspirados en el vocabulario del local, no copias de los murales. Así no hace falta el permiso del muralista para usarlas.

---

## 3. Tokens

### 3.1 Color
| Token | HEX | Origen | Rol |
|---|---|---|---|
| `pizarra` | `#0B0A09` | Fondo del logo y mostrador | Fondo de toda la página |
| `pizarra-2` | `#16140F` | — | Superficie: paneles, filas resaltadas, campos de formulario |
| `tiza` | `#F3EEE4` | Letras del logo | Texto e ilustración de línea (17:1) |
| `tiza-muted` | `#B4AC9E` | — | Descripciones, metadatos (8,6:1) |
| `oro` | `#DEC67E` | Trazo dorado de los murales | Ilustración, estrellas de reseñas, foco de teclado, detalles (11,8:1) |
| `nopal` | `#078500` | Adorno verde del logo | **Botón principal** (WhatsApp); blanco encima 4,8:1 |
| `nopal-claro` | `#2FB344` | — | Texto verde sobre negro: indicador "Abierto" (7,2:1) |
| `chile` | `#D20001` | Adorno rojo del logo | Adornos, subrayados, etiquetas "pica" o "nuevo"; nunca texto pequeño sobre negro |
| `turquesa` | `#2F6F74` | Pared turquesa | **La única franja de color** (Nuestra casa); texto blanco encima 5,8:1 |
| `naranja` | `#DE7E2A` | Mural del atardecer | Detalles de ilustración, como el brillo del sol |

> El dorado de los botones del menú OlaClick (`#9D7419`) queda fuera del sitio. Blanco encima no llega a 4,5:1, y el verde del logo ya cumple como botón y conecta con WhatsApp.

### 3.2 Tipografía
| Rol | Fuente | Ajustes |
|---|---|---|
| Logo y eslogan | **El logo como imagen**, sin recrearlo con una fuente | PNG con transparencia hecho del logo oficial, provisional hasta tener el SVG |
| Titulares | **Bricolage Grotesque Variable**, ancho condensado (`wdth` 75), peso 700–800 | Recuerda la rotulación a mano de las taquerías: angosta, firme y un poco irregular |
| Texto, menú y UI | **Bricolage Grotesque Variable**, ancho normal, peso 400 y 500 | Una sola familia en dos anchos; precios con `tabular-nums` |

Escala (desktop / móvil):

| Elemento | Desktop | Móvil |
|---|---|---|
| h1 | 88/0,95 | 48 |
| h2 | 56/1 | 36 |
| h3 | 24/1,2 | — |
| Cuerpo | 18/1,6 | — |
| Filas del menú | 17/1,5 | — |
| Etiquetas | 14 | — |

Reglas:
- Líneas de 60 a 70 caracteres como máximo.
- Sin etiquetas en MAYÚSCULAS espaciadas encima de los titulares.
- No se destaca una sola palabra dentro de un titular.

### 3.3 Espacio y layout
- Contenedor de **1200 px**; márgenes laterales `clamp(16px, 5vw, 120px)`. Los dos bordes siempre iguales.
- Rejilla de 12 columnas con 24 px de separación. En móvil, una columna.
- Ritmo vertical de secciones: `clamp(96px, 12vw, 160px)`.
- Fotos con **esquinas rectas**. Bordes de 1 px en `tiza/12%`. Sin sombras.
- Botones de 48 px de alto (44 mínimo en móvil) con radio de 999 px. Un solo estilo de botón principal y uno de enlace.

---

## 4. Arquitectura de la página (una sola página, `/`)

```
┌ header fijo ─────────────────────────────────────────────────────────┐
│ [logo]   Menú  Nuestra casa  Galería  Reseñas  Visítanos  [Reservar] │
└──────────────────────────────────────────────────────────────────────┘
1. HERO (100svh)
┌──────────────────────────────┬─────────────────────────────┐
│  ☀ sol con rostro en tiza (detrás, sale del encuadre)       │
│  [LOGO grande]               │  ┌──────────────────────┐   │
│  h1 Comida mexicana en       │  │ foto real del local   │   │
│     Barrio Los Andes         │  │ (mostrador tiza +     │   │
│  Tacos, pozole estilo        │  │  muro de musgo)       │   │
│  Guerrero y cantaritos…      │  └──────────────────────┘   │
│  [Reservar mesa]  Ver el menú│   🌵 saguaro · nopal · agave │
│  ● Abierto hoy 12–10 p.m.    │                             │
│  8 Calle NO, Barrio Los Andes│                             │
└──────────────────────────────┴─────────────────────────────┘
2. NUESTRA CASA (franja turquesa, ilustración dorada de cerros y cactus)
   texto a la izquierda (h2 + 2 párrafos + "Sabor, atención y ambiente.") │ foto promo con sarape
3. MENÚ INTERACTIVO (2 pantallas)
   encabezado: h2 "El menú" ........ "Precios en lempiras…" + Pedir en línea
   Los favoritos de la casa: 4 fotos (birria · pozole · pastor · molcajete) con precio
   [Tacos][Botanas][Sopas][De la cocina][Combos][Bebidas][Chevez][Cocteles][Tequilas][Postres][Extras]
   filas: nombre ............ L 147    │  vista previa fija con la foto del
          descripción en gris           │  platillo bajo el cursor o el foco
4. GALERÍA "La casa de noche": muro asimétrico de 7 fotos reales
5. RESEÑAS: 4,4 ★ grande + 553 reseñas + barras del reparto real | 3 reseñas literales + enlace a Google
6. RESERVAR: formulario (nombre, personas, día, hora, nota) → abre WhatsApp con el mensaje listo
7. VISÍTANOS: dirección en letra grande (el momento tipográfico) + horario con hoy marcado + hora feliz
              + teléfonos + [Cómo llegar] | mapa dibujado en tiza → "Cargar mapa de Google" (iframe a pedido)
8. FOOTER: logo · dirección · horario · Instagram · Facebook · TikTok · Pedir en línea · créditos
   barra móvil fija: [Reservar] [Cómo llegar]
```

**Orden.** Se respeta el orden que pediste: Hero, Historia, Menú, Galería, Reseñas, Reservas y Mapa. Para no esconder lo que más busca la gente (abierto, horario, dónde queda), el **hero ya muestra el estado de hoy y la dirección**, y la barra móvil lleva a *Reservar* y *Cómo llegar* desde cualquier punto.

### Componentes
| Componente | Archivo | Notas |
|---|---|---|
| `Header` | `src/components/Header.astro` | Fijo; se vuelve sólido al hacer scroll; menú a pantalla completa en móvil con `aria-expanded` |
| `Hero` | `src/components/Hero.astro` | Capas de ilustración (`data-layer`) ya listas para el parallax de la Fase 4 |
| `Historia` | `src/components/Story.astro` | La franja turquesa |
| `Menu` | `src/components/Menu.astro` | Datos de `src/data/menu.json`. Pestañas accesibles (`role=tablist`, flechas del teclado). **Sin JS se ven todas las categorías.** |
| `Gallery` | `src/components/Gallery.astro` | `<Image />` con `widths`/`sizes`, carga diferida |
| `Reviews` | `src/components/Reviews.astro` | Solo datos reales; enlace a Google Maps |
| `Reserve` | `src/components/Reserve.astro` | Formulario que arma el enlace `wa.me/50499121332?text=…` |
| `Visit` | `src/components/Visit.astro` | Horario de `src/data/restaurant.ts`; "abierto ahora" calculado con la hora de Tegucigalpa |
| `Footer`, `ActionBar` | — | — |
| Ilustraciones | `src/components/illustrations/*.astro` | SVG de trazo (`stroke="currentColor"`, `pathLength="1"`) listos para animar el dibujo |

---

## 5. Sistema de ilustración (original)
- **Trazo:** 2–2,5 px redondeado, `fill: none`, en `tiza` o `oro`. Rellenos solo en el sol (`naranja` al 15 %).
- **Piezas:**
  - sol con rostro (ojos cerrados, rayos ondulados);
  - luna creciente con rostro;
  - saguaro;
  - nopal con tunas;
  - agave;
  - nube de espiral;
  - cerros rayados;
  - estrella de 4 puntas;
  - papel picado (banderines calados con flor y rombo).
- **Uso:** como capas de fondo del hero, la franja de "Nuestra casa", el divisor del menú, el mapa y el footer. Siempre decorativas, con `aria-hidden="true"`.

---

## 6. Movimiento (Fase 4, implementado)
Todo vive en [`src/scripts/motion.ts`](src/scripts/motion.ts) y se carga con un `<script>` nativo de Astro en `Base.astro`. Se controla con atributos `data-*` en el marcado y se monta dentro de `gsap.matchMedia()`.

| Momento | Qué pasa | Atributo |
|---|---|---|
| **Scroll** | Lenis (`lerp 0.1`) sincronizado con el ticker de GSAP. Las anclas compensan el header. Se detiene cuando el menú móvil está abierto. | — |
| **Hero, entrada única (~2,2 s)** | La foto "amanece" con clip-path de abajo hacia arriba mientras su imagen va de 1,18 a 1. Luego el sol se dibuja en tiza: los rayos, después los anillos y al final el rostro. El logo aparece con un leve desenfoque, el titular sube palabra por palabra, los cactus "crecen", la luna se dibuja y las estrellas aparecen. | `data-enter` |
| **Amanecer del hero** | Con el scroll, el sol sube por encima de la foto y crece. Detrás nace un halo dorado, el cielo pasa de pizarra a aurora (índigo → terracota), la luna y las estrellas se apagan, y el trazo del sol cambia de tiza a tinta oscura para leerse sobre el halo. En escritorio el hero se queda fijo (pin, 75 % de pantalla) mientras amanece; en móvil ocurre mientras la foto cruza la pantalla, sin pin. | `data-sky`, `data-dawn-glow`, `data-sun-wrap`, `data-night` |
| **Parallax por capas** | Hero: el sol y la luna se quedan atrás; la foto, los cactus y las estrellas se adelantan. También hay capas en "Nuestra casa", en los favoritos (columnas a dos velocidades), en la reserva y en el footer. En móvil la amplitud se reduce al 55 %. | `data-speed`, `data-parallax-trigger` |
| **Fotos de platillos y del local** | La imagen se desliza dentro de su marco, que no se mueve. Cada foto de la galería tiene su propia amplitud. | `data-parallax-img` |
| **Revelado tipográfico** | Los h2, la frase "Sabor, atención y ambiente." y la dirección en grande suben palabra por palabra **una sola vez**. No se aplica a párrafos ni tarjetas. | `data-reveal="words"` |
| **Foto de "Nuestra casa"** | Se descubre con clip-path una vez. | `data-reveal="clip"` |
| **Papel picado** | Los banderines caen al cordel desde el centro y luego **se mecen según la velocidad del scroll**, hasta ±12°. Al parar vuelven a su lugar, así que no hay loops infinitos. | `data-wind` |
| **Reseñas** | Las barras del reparto crecen desde la izquierda una vez. | `data-bars` |
| **Mapa** | El sol de la portada del mapa gira despacio con el scroll. | `data-spin` |
| **Puntero (solo mouse)** | Las capas del hero siguen al cursor muy poco, y el botón "Reservar mesa" del hero es magnético. Se mueve una envoltura, así el botón conserva su hover y su `:active`. | `data-mouse-depth`, `data-magnetic` |
| **Microinteracciones** | Botones con `scale(0.97)` al presionar; el hover solo existe con `(hover: hover) and (pointer: fine)`. Las fotos hacen zoom de 1,03 dentro de su marco y los subrayados se dibujan. La categoría del menú entra en 220 ms. La foto de vista previa cambia con un fundido con desenfoque, como recomienda Emil Kowalski. | CSS |
| **`prefers-reduced-motion`** | Sin Lenis, sin entrada, sin parallax ni revelados. El contenido nunca queda oculto. Si el JS falla, el hero aparece solo a los 3 s. | — |

Reglas que se siguieron:
- Solo se animan `transform`, `opacity`, `clip-path` y `stroke-dashoffset` (este último una vez).
- Las curvas son ease-out fuertes (`expo.out`).
- Nada se repite en loop.

**Rendimiento medido** (Chrome sin interfaz, build de producción, recorrido completo de la página en 8 s):

| Pantalla | FPS medio | p95 por cuadro | Cuadros > 33 ms | CLS | Tareas largas |
|---|---|---|---|---|---|
| 1440×900 | **60** | 16,9 ms | 1 de 476 | **0** | 0 |
| 390×844 | **60** | 16,9 ms | 0 de 480 | **0** | 0 |

---

## 7. Cómo se combinaron las skills (y dónde mandaste tú)
| Skill | Qué se tomó | Qué no se siguió, por tu brief |
|---|---|---|
| **frontend-design** | Una sola apuesta fuerte (el sol de tiza); tipografía elegida a propósito; sin etiquetas en mayúsculas ni flechas "→" | — |
| **design-taste-frontend** (tipo *place*) | Las fotos reales mandan; menú como texto con precios visibles; momento tipográfico con la dirección; barra de acciones en móvil; un solo botón principal por pantalla; sin texto sobre fotos; sin carrusel | Pide páginas claras y sin parallax en restaurantes, pero **tu marca es negra y pediste parallax** en la Fase 4. Pide datos de contacto ficticios, pero aquí se usan **los reales**. Sus scripts de gate y deal no se usaron porque fallarían con datos reales. |
| **ui-ux-pro-max** | Hero centrado en convertir, colores cálidos y fotos que abren el apetito, objetivos táctiles de 44 px, contraste AA, `prefers-reduced-motion`, CLS < 0,1 | Su propuesta automática (claymorfismo rosa con Caveat y Quicksand) no encaja con la marca y se descartó |
| **astro / astro-best-practices** | Sitio estático, `.astro` sin islas, `<Image />` de `astro:assets`, JS mínimo en `<script>` nativos, HTML semántico | — |

---

## 8. Pendientes
1. **Historia.** El texto usa solo lo verificado ("desde 1995", "nuestra madre Ofelia", el pozole estilo Guerrero como especialidad). Falta que el cliente confirme la narrativa completa.
2. **Logo vectorial.** El PNG actual sale de un JPG de 475 px.
3. **Fotos de Google Maps.** Se usan como borrador en el hero y la galería, pero no se sabe quién las subió. Hay que reemplazarlas por fotos del cliente en alta resolución.
4. **Número para reservas.** El formulario usa el **+504 9912-1332**. Falta confirmar que es el que atiende reservas.
5. **Reseñas.** Hay 4 reseñas reales; el cliente puede elegir otras.
