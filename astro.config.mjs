// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: poner el dominio final cuando el cliente lo confirme (canonical, sitemap, og:url).
  // site: 'https://…',
  // 'class' hace que el estilo con scope de un componente llegue al SVG de las ilustraciones
  // cuando se les pasa class="…" desde el padre.
  scopedStyleStrategy: 'class',
  image: {
    // Los estilos de imagen responsive los define src/styles/global.css (.ph).
    responsiveStyles: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
