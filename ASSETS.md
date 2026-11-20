# Activos visuales — Donde Ofelia • Los Andes

> Descargados el 20 nov 2026; ahora viven en `src/assets/`: **135 archivos, 15 MB en total**.
> Se optimizan con `<Image />` de Astro (en las tablas se usan rutas relativas a `src/assets/`).
>
> **Derechos de uso** (columna "Uso"):
> - ✅ **Oficial**: material publicado por el propio restaurante.
> - 🟡 **Referencia**: hay que confirmar autoría o permiso antes de publicarlo.
> - ❌ **Solo inspiración**: no se publica.

## 1. Marca — `src/assets/brand/`
| Archivo | Tamaño | Fuente | Descripción | Uso |
|---|---|---|---|---|
| `logo-olaclick.jpg` | 475×475 | [Logo del menú OlaClick](https://assets.olaclick.app/companies/logos/441cb9cb-c925-4dba-87a0-2c053c8eba71.jpg) | Logo clásico: pincel blanco con adorno verde y adorno rojo, sobre negro | ✅ Base para vectorizar mientras llega el original |
| `logo-instagram-profile.jpg` | 150×150 | Foto de perfil de IG `@dondeofelia` | Logo actual monocromo y caligráfico, sobre fibra de carbono | ✅ Referencia de la versión vigente |

**🚩 Pedir al cliente:**
- El logo en **SVG, AI o PDF** (versión clásica a color y versión monocroma).
- El **nombre o los archivos del muralista** (la firma se lee "CHRIS… AR(V)A") para usar sus ilustraciones con permiso y darle crédito.

## 2. Fotos de platillos (oficiales) — `src/assets/menu/<categoría>/<platillo>.jpg`
- **115 fotos oficiales**, una por producto, a **800×800 px** como máximo. Fuente: menú OlaClick del restaurante.
- Datos y ruta local de cada foto: [`src/data/menu.json`](src/data/menu.json).
- **Uso:** ✅ oficial. Son fotos de estudio, la mayoría sobre **fondo blanco**. Sirven para recortes (PNG o WebP con transparencia) y parallax de platillos "flotando" sobre el fondo negro.
- ⚠️ **Resolución limitada** (800 px). Alcanzan para tarjetas del menú, pero **no para un hero a pantalla completa**. Pedir los originales en alta resolución.
- ⚠️ Algunas parecen **fotos de stock** y no del restaurante: `molcajete-nuevo.jpg`, `cantaritos.jpg`, `chongos-zamoranos.jpg` y las botellas de licores. Hay que confirmarlo con el cliente.

### Fotos para los platillos estrella
| Platillo | Archivo |
|---|---|
| Tacos de Birria | `src/assets/menu/amor-al-primer-taco/tacos-de-birria.jpg` |
| Tacos al Pastor | `src/assets/menu/amor-al-primer-taco/tacos-al-pastor.jpg` |
| Tacos de Suadero | `src/assets/menu/amor-al-primer-taco/tacos-de-suadero.jpg` |
| La Estación del Taco | `src/assets/menu/amor-al-primer-taco/la-estacion-del-taco-nuevo.jpg` |
| Pozole Estilo Guerrero | `src/assets/menu/sopas-aztecas/pozole-estilo-guerrero.jpg` |
| Sopa de Tortilla | `src/assets/menu/sopas-aztecas/sopa-de-tortilla.jpg` |
| Molcajete | `src/assets/menu/de-la-cocina-de-ofelia/molcajete-nuevo.jpg` |
| Parrillada de Tacos | `src/assets/menu/de-la-cocina-de-ofelia/parrillada-de-tacos.jpg` |
| Birriada | `src/assets/menu/de-la-cocina-de-ofelia/birriada-donde-ofelia.jpeg` |
| Chilaquiles | `src/assets/menu/de-la-cocina-de-ofelia/chilaquiles.jpg` |
| Tostada Estilo Ofelia | `src/assets/menu/de-la-cocina-de-ofelia/tostada-estilo-ofelia.jpg` |
| Cantaritos | `src/assets/menu/cocteles-y-tragos/cantaritos.jpg` |
| Chongos Zamoranos | `src/assets/menu/postres/chongos-zamoranos.jpg` |

**16 productos no tienen foto:** Cazuela de frijoles, Chalupas, Filetazo, Combinado de dos carnes y los extras.

## 3. Interior y murales (Google Maps) — `src/assets/local/`
| Archivo | Tamaño | Qué muestra | Uso sugerido | Derechos |
|---|---|---|---|---|
| `local/gm-01.jpg` | 1600×1200 | **Pared turquesa con ilustración dorada** de cactus, el mural del atardecer, papel picado y faroles | Hero o "Concepto"; referencia para redibujar la ilustración en SVG | 🟡 |
| `local/gm-02.jpg` | 1080×1920 | Estantería de **lotería** retroiluminada, muro de musgo con el logo y mostrador con ilustración | Galería | 🟡 |
| `local/gm-03.jpg` | 1440×912 | **Foto promocional** con los adornos rojo y verde del logo: tacos al pastor, pozole, chilaquiles y sarape | Galería o Menú. Muestra cómo usa la marca sus adornos. | ✅ Probablemente del dueño |
| `local/gm-04.jpg` | 1600×2133 | Flautas o enchiladas en mole | Galería | 🟡 Parece foto de un cliente |
| `local/gm-05.jpg` | 1600×1200 | **Mostrador negro con ilustración blanca tipo tiza** (sol con rostro, luna, cactus), **muro de musgo con el logo**, mural de mandala, pared mostaza y pared índigo | **La mejor imagen de identidad.** Hero o "Concepto" | 🟡 |
| `local/gm-06.jpg` | 1080×1920 | **Ofelia's Garden**: escenario con neón rosa, papel picado y música en vivo | Sección de eventos o vida nocturna | 🟡 |
| `local/gm-07.jpg` | 1600×2133 | Estantería de lotería completa con botellas | Galería, detalle | 🟡 |

Fuente: galería de la ficha de Google Maps (`cid=7760042563399747514`). Google no indica quién subió cada foto (dueño o cliente), así que **hay que confirmarlo o reemplazarlas por fotos del cliente**.

## 4. Instagram `@dondeofelia` — `src/assets/instagram/`
Son miniaturas de **360 a 640 px** de las publicaciones de octubre y noviembre de 2026. Sirven para **referencia de ambiente**; para producción hay que pedir los originales.

| Archivo | Publicación | Qué muestra | Uso |
|---|---|---|---|
| `ig-De0gOeSBLjL.jpg` | [reel](https://www.instagram.com/dondeofelia/reel/De0gOeSBLjL/) | **Mostrador con ilustración blanca y muro de musgo con el logo en neón.** Texto: "SIEMPRE TERMINO AQUÍ" | ✅ Oficial (miniatura) |
| `ig-DQ5dlRUAE1e.jpg` | [reel](https://www.instagram.com/dondeofelia/reel/DQ5dlRUAE1e/) | Salón de noche con lámparas tejidas de palma, piso de terracota y especial navideño | ✅ Oficial |
| `ig-DfquHL0ArYB.jpg` | [reel](https://www.instagram.com/belierame/reel/DfquHL0ArYB/) | Estantería de lotería retroiluminada | 🟡 Colaboración con una creadora externa |
| `ig-DfDwo3aBFJT.jpg` | [post](https://www.instagram.com/dondeofelia/p/DfDwo3aBFJT/) | Flautas o enchiladas en salsa verde sobre mesa de madera. Buena luz. | ✅ Oficial |
| `ig-De-tlxENfTM.jpg` | [reel](https://www.instagram.com/dondeofelia/reel/De-tlxENfTM/) | Tacos con bebida | ✅ Oficial |
| `ig-Dfh_zKChX6N.jpg` | [reel](https://www.instagram.com/dondeofelia/reel/Dfh_zKChX6N/) | Mesero sirviendo en el salón, con la pared de cactus de fondo | ✅ Oficial |
| `ig-DfQ5MQ8pdey.jpg` | [reel](https://www.instagram.com/dondeofelia/reel/DfQ5MQ8pdey/) | Clienta con bebida (contenido promocional) | ✅ Oficial |
| `ig-Df3qHwNAmRs.jpg` | [reel](https://www.instagram.com/dondeofelia/reel/Df3qHwNAmRs/) | Torta con humo (contenido promocional) | ✅ Oficial |
| `ig-Dfn4_mTAEYg.jpg` | [reel](https://www.instagram.com/dondeofelia/reel/Dfn4_mTAEYg/) | Evento "Las Damas de Hierro" con papel picado y público | ✅ Oficial (eventos) |
| `ig-DfAUwu_BR_0.jpg` | [post](https://www.instagram.com/dondeofelia/p/DfAUwu_BR_0/) | Póster "Noche del Recuerdo": tipografía de eventos y logos de Ofelia's Garden y La 20 | ✅ Referencia gráfica |
| `ig-Dfm2uh6Bfhx.jpg` | [post](https://www.instagram.com/dondeofelia/p/Dfm2uh6Bfhx/) | Póster de karaoke con mariachi | ✅ Referencia gráfica |

## 5. Lo que falta para un hero de nivel Awwwards
1. **Fotos del local en alta resolución (2400 px o más)** de los murales: el mostrador tiza, la pared turquesa y el muro de musgo. Idealmente de noche, con las luces encendidas.
2. **Logo vectorial.**
3. **Hero de platillos en alta resolución**: birria con consomé, pozole y molcajete.
4. **Archivos o permiso del muralista.** La alternativa es que yo **redibuje en SVG** los motivos (sol con rostro, luna, saguaro, nopal, agave, nubes de rizo y espirales) inspirándome en sus trazos, no copiándolos, para animar el trazo con parallax.
5. Un video corto en vertical u horizontal del salón de noche, para el fondo del hero (opcional).
