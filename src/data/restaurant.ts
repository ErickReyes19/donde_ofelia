// Datos verificados de Donde Ofelia • Los Andes (ver RESTAURANT_DATA.md).
// Fuentes: Google Maps (nov 2026) y el menú oficial dondeofelia.ola.click.

export const restaurant = {
  name: 'Donde Ofelia',
  branch: 'Los Andes',
  fullName: 'Donde Ofelia • Los Andes',
  slogan: '¡Con Sabor a México!',
  since: 1995,
  city: 'San Pedro Sula',

  address: {
    street: '8 Calle NO',
    between: 'entre 14 Avenida y Blvd. de los Caminantes',
    landmark: 'Contiguo a Laboratorio',
    district: 'Barrio Los Andes',
    city: 'San Pedro Sula, Cortés',
    postalCode: '21102',
    country: 'HN',
  },
  geo: { lat: 15.5126819, lng: -88.0331192 },
  plusCode: 'GX78+3Q San Pedro Sula',

  // Ficha de Google Maps (CID) y búsqueda para "Cómo llegar"
  mapsUrl: 'https://maps.google.com/?cid=7760042563399747514',
  // Por coordenadas, para no caer en la otra sucursal ("Donde Ofelia No 1").
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=15.5126819,-88.0331192',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Donde+Ofelia+Los+Andes,+8+Calle+NO,+San+Pedro+Sula&z=17&output=embed',

  phones: {
    // +504 9912-1332: teléfono de la ficha de Google y "WhatsApp #2" del menú oficial.
    main: { display: '9912-1332', e164: '+50499121332', wa: '50499121332' },
    // +504 9789-3461: "WhatsApp #1" del menú oficial (pedidos).
    orders: { display: '9789-3461', e164: '+50497893461', wa: '50497893461' },
  },

  orderUrl: 'https://dondeofelia.ola.click/products',
  social: {
    instagram: { handle: '@dondeofelia', url: 'https://www.instagram.com/dondeofelia/' },
    facebook: { handle: 'DondeOfeliaHN', url: 'https://www.facebook.com/DondeOfeliaHN/' },
    tiktok: { handle: '@dondeofelia', url: 'https://www.tiktok.com/@dondeofelia' },
  },

  // Horario: igual los 7 días (Google Maps y OlaClick coinciden). Zona horaria de Honduras.
  timezone: 'America/Tegucigalpa',
  hours: { open: '12:00', close: '22:00' },
  week: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
  happyHour: [
    { day: 'jueves', dayIndex: 4, open: '17:30', close: '22:00' },
    { day: 'viernes', dayIndex: 5, open: '17:30', close: '20:30' },
  ],
  combosNote: 'MexiCombos de lunes a jueves, de 12 a 3 p.m.',

  rating: {
    value: 4.4,
    count: 553,
    // Reparto de Google (vía Wanderlog, 547 reseñas)
    distribution: { 5: 353, 4: 108, 3: 47, 2: 15, 1: 24 } as Record<1 | 2 | 3 | 4 | 5, number>,
    source: 'Google Maps',
  },
} as const;

// Reseñas reales de Google Maps (texto literal, sin editar el contenido).
export const reviews = [
  {
    author: 'p M',
    stars: 5,
    when: 'hace 2 años',
    text:
      'Calmado y perfecto para reuniones familiares y salidas con amigos. Recomendable para almuerzos pero más para ir a cenas, las luces y la decoración hace que sea un espectáculo por la noche. Muy buen servicio, camareros y camareras amables.',
  },
  {
    author: 'Un patepluma viajero',
    stars: 5,
    when: 'hace 3 meses',
    text: 'Un bonito lugar al que seguramente regresaré, excelente ambiente, buena atención y la comida muy rica.',
  },
  {
    author: 'Sand R.',
    stars: 4,
    when: 'hace 3 meses',
    text: 'El lugar es muy lindo y nos atendieron muy bien. Los tacos flauta con mole deliciosos.',
  },
] as const;

/** "12:00" -> "12 p.m.", "17:30" -> "5:30 p.m." */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'p.m.' : 'a.m.';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}

/** "17:30","22:00" -> "5:30 a 10 p.m." (omite el primer sufijo si es igual al segundo) */
export function formatRange(open: string, close: string): string {
  const a = formatTime(open), b = formatTime(close);
  const sa = a.slice(-4), sb = b.slice(-4);
  return `${sa === sb ? a.slice(0, -5) : a} a ${b}`;
}

export const hoursLabel = formatRange(restaurant.hours.open, restaurant.hours.close);
export const happyHourLabel = restaurant.happyHour.map((h) => `${h.day} de ${formatRange(h.open, h.close)}`).join(' y ');
