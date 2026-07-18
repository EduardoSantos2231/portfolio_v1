import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: "https://EduardoSantos2231.github.io",
  base: "/portfolio_v1",
  output: "static",
  integrations: [mdx()],
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
