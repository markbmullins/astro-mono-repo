// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import svgLoader from "vite-svg-loader";
import expressiveCode from "astro-expressive-code";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import critters from "astro-critters";

/** @type {import('rehype-expressive-code').RehypeExpressiveCodeOptions} */
const rehypeExpressiveCodeOptions = {
  // You can add configuration options here
};

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), svgLoader()],
  },
  compressHTML: true,
  redirects: {
    blog: "/blog/1",
  },

  integrations: [expressiveCode(), sitemap(), critters()],
  output: "server",
  adapter: vercel(),
  site: "https://www.parkcirclewebdesign.com"
});