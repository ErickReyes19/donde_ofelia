// Menú real de Donde Ofelia • Los Andes, extraído de dondeofelia.ola.click (20 nov 2026).
// menu.json guarda los datos crudos; aquí se ordenan, se limpian emojis y marcas "NUEVO",
// y se corrigen erratas y tildes evidentes (el contenido y los precios no cambian).
import type { ImageMetadata } from 'astro';
import raw from './menu.json';

type RawItem = {
  category: string;
  categorySlug: string;
  name: string;
  slug: string;
  description: string;
  variants: { name: string | null; price: number }[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  variants: { name: string | null; price: number }[];
  isNew: boolean;
  image?: ImageMetadata;
};

export type MenuCategory = {
  id: string;
  label: string;
  note?: string;
  items: MenuItem[];
};

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/menu/**/*.{jpg,jpeg,png}', { eager: true });

function findImage(categorySlug: string, slug: string): ImageMetadata | undefined {
  const key = Object.keys(images).find((k) => k.includes(`/${categorySlug}/${slug}.`));
  return key ? images[key].default : undefined;
}

const EMOJI = /[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu;

// Erratas y tildes del menú original
const FIXES: [RegExp, string][] = [
  [/\by y\b/g, 'y'],
  [/único único/g, 'único'],
  [/derretid\./g, 'derretido.'],
  [/preferemcia/g, 'preferencia'],
  [/cuantro/g, 'cuatro'],
  [/agucate/g, 'aguacate'],
  [/\bAguia\b/g, 'Agua'],
  [/\bDooble\b/g, 'Doble'],
  [/\bmaiz\b/g, 'maíz'],
  [/\bMaiz\b/g, 'Maíz'],
  [/\beleccion\b/g, 'elección'],
  [/\bchicharron\b/g, 'chicharrón'],
  [/\bChicharron\b/g, 'Chicharrón'],
  [/\bpimenton\b/g, 'pimentón'],
  [/\boregano\b/g, 'orégano'],
  [/\blimon\b/g, 'limón'],
  [/\bLimon\b/g, 'Limón'],
  [/\bconsome\b/g, 'consomé'],
  [/\bcarbon\b/g, 'carbón'],
  [/\brecien\b/g, 'recién'],
  [/\bencantara\b/g, 'encantará'],
  [/\bPidelas\b/g, 'Pídelas'],
  [/\bPidelo\b/g, 'Pídelo'],
  [/\bTe Lipton\b/g, 'Té Lipton'],
  [/\bRepublica\b/g, 'República'],
  [/\bJager\b/g, 'Jäger'],
  [/\bBuchanans\b/g, "Buchanan's"],
  [/\bJack Daniel´s\b/g, "Jack Daniel's"],
  [/Ofelia´s/g, "Ofelia's"],
  [/\bEspolon\b/g, 'Espolón'],
  [/\bJose Cuervo\b/g, 'José Cuervo'],
  [/\bEl Patron\b/g, 'El Patrón'],
  [/\bEspadin\b/g, 'Espadín'],
  [/^Que me ves$/g, 'Qué me ves'],
  [/\bsi señor!/g, 'sí, señor!'],
  [/Para chuparse los dedos/g, '¡Para chuparse los dedos,'],
  [/No te pases de lanza!+/g, '¡No te pases de lanza!'],
  [/"Ojo es plato fuerte"/g, '«Ojo: es plato fuerte»'],
  [/"La auténtica lasaña Mexicana"/g, '«La auténtica lasaña mexicana»'],
  [/"Un misterio a tu paladar"/g, '«Un misterio a tu paladar»'],
  [/¡Las favoritas de nuestra madre Ofelia!/g, '¡Las favoritas de nuestra madre Ofelia!'],
  [/\.\.$/g, '.'],
];

function clean(text: string): string {
  let t = text.replace(EMOJI, '').replace(/\s+/g, ' ').trim();
  for (const [re, to] of FIXES) t = t.replace(re, to);
  // "¡Para chuparse los dedos, sí, señor!" -> evita la coma doble
  t = t.replace('¡Para chuparse los dedos, sí, señor!', '¡Para chuparse los dedos, sí señor!');
  return t.replace(/\s+([.,;:!?])/g, '$1').trim();
}

function cleanName(name: string) {
  const isNew = /nuevo/i.test(name);
  const n = clean(name.replace(/\(?\s*nuevo\s*\)?/gi, ''));
  return { name: n, isNew };
}

// Orden y nombres de las categorías en el sitio
const ORDER: { id: string; label: string; from: string[]; note?: string }[] = [
  { id: 'tacos', label: 'Tacos', from: ['amor-al-primer-taco'], note: 'Orden de tres tacos, salvo que se indique otra cosa.' },
  { id: 'cocina', label: 'De la cocina de Ofelia', from: ['de-la-cocina-de-ofelia'] },
  { id: 'sopas', label: 'Sopas', from: ['sopas-aztecas'] },
  { id: 'botanas', label: 'Botanas', from: ['botanas'] },
  {
    id: 'combos',
    label: 'Combos y promos',
    from: ['combos-lunes-a-jueves-12-a-3', 'promos-no-aplica-a-domicilio'],
    note: 'MexiCombos de lunes a jueves, de 12 a 3 p.m. El cubetazo no aplica a domicilio.',
  },
  { id: 'cocteles', label: 'Cocteles', from: ['cocteles-y-tragos'] },
  { id: 'tequilas', label: 'Tequilas y mezcales', from: ['tequilas-y-mezcales'], note: 'Precio por caballito sencillo, doble o botella.' },
  { id: 'chevez', label: 'Las chevez', from: ['las-chevez'] },
  { id: 'bebidas', label: 'Bebidas', from: ['bebidas'] },
  { id: 'postres', label: 'Postres', from: ['postres'] },
  { id: 'extras', label: 'Extras', from: ['extras'] },
];

const items = raw as RawItem[];

export const menu: MenuCategory[] = ORDER.map((cat) => ({
  id: cat.id,
  label: cat.label,
  note: cat.note,
  items: items
    .filter((it) => cat.from.includes(it.categorySlug))
    .map((it) => {
      const { name, isNew } = cleanName(it.name);
      return {
        id: it.slug,
        name,
        description: clean(it.description),
        variants: it.variants.map((v) => ({ name: v.name ? clean(v.name) : null, price: v.price })),
        isNew,
        image: findImage(it.categorySlug, it.slug),
      };
    }),
}));

export const allItems = menu.flatMap((c) => c.items);
export const itemBySlug = (slug: string) => allItems.find((i) => i.id === slug);

// Los favoritos de la casa: lo más mencionado en reseñas y lo que el menú llama especialidad.
export const favorites = ['tacos-de-birria', 'pozole-estilo-guerrero', 'quesabirria', 'tostada-estilo-ofelia']
  .map(itemBySlug)
  .filter((i): i is MenuItem => Boolean(i));

const nf = new Intl.NumberFormat('es-HN', { maximumFractionDigits: 0 });
export const price = (n: number) => `L ${nf.format(n)}`;
