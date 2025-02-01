import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig, sharpImageService } from "astro/config";
import config from "./src/config/config.json";
import AutoImport from "astro-auto-import";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://vet-echo.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  compressHTML: true,
  minify: true,
  output: 'hybrid',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    }
  },
  compilerOptions: {
    strictNullChecks: true, // add if using `base` template
    allowJs: true // required, and included with all Astro templates
  },
  // Image optimization service
  image: {
    service: sharpImageService(),
  },

  integrations: [react(), sitemap(), tailwind(), AutoImport({
    // import react components to use in mdx
    imports: [
      "@/components/react/FeatherIcon.tsx",
      "@/components/CounterComponent.astro",
      "@/components/core/Section.astro",
      "@/components/react/Changelog.tsx",
      "@/components/Badge.astro",
    ],
  }), mdx(),],

  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    }
  },

  adapter: cloudflare(),
});