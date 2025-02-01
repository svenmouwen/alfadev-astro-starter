import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig, sharpImageService } from "astro/config";
import config from "./src/config/config.json";
import AutoImport from "astro-auto-import";
import starlight from "@astrojs/starlight";
import commonjs from "@rollup/plugin-commonjs";

// https://astro.build/config
/**
 * @type {import('astro').AstroUserConfig}
 * @description Astro configuration file that defines various build and development settings
 * @property {string} site - The base URL for the site (defaults to 'http://vet-echo.nl')
 * @property {string} base - The base path for the site (defaults to '/')
 * @property {'always'|'never'} trailingSlash - Whether to add trailing slashes to URLs
 * @property {'static'|'server'} output - The output mode for building
 * @property {Array} adapters - List of adapters to use (defaults to ['filesystem'])
 * @property {Array} integrations - Array of Astro integrations including:
 *   - react() for React components
 *   - sitemap() for sitemap generation
 *   - tailwind() for Tailwind CSS
 *   - AutoImport for component imports
 *   - mdx() for MDX support
 *   - starlight()for documentation
 * @property {string} srcDir - Source directory path
 * @property {string} publicDir - Public assets directory path
 * @property {string} outDir - Output directory path
 * @property {Object} vite - Vite configuration including SSR settings
 * @property {Object} build - Build configuration options
 * @property {Object} image - Image optimization service configuration
 * @property {Object} markdown - Markdown parsing configuration
 */
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://vet-echo.nl",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  output: config.site.output ? config.site.output : "static",
  adapters: [config.site.adapter ? config.site.adapter : "filesystem"], //TODO: add node adapter
  integrations: [
    starlight({
      title: "Docs",
      logo: {
        src: "./src/assets/images/logo.svg",
      },
    }),
    react(),
    sitemap(),
    tailwind(),
    AutoImport({
      include: ["./src/**/*.astro", "./src/**/*.mdx", "./src/**/*.ts"],
      // import react components to use in mdx
      imports: [
        "@/components/react/FeatherIcon.tsx",
        "@/components/CounterComponent.astro",
        "@/components/core/Section.astro",
        "@/components/react/Changelog.tsx",
        "@/components/Badge.astro",
      ],
    }),
    mdx(),
  ],
  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",

  vite: {
    ssr: {
      external: ["./admin"],
      noExternal: true,
    },
    plugins: [commonjs()],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
  build: {
    format: "file",
    client: "esbuild",
    rollupOptions: {
      input: "/src/content/homepage/index.md", // Your entry file
      output: {
        dir: "dist",
        format: "esm", // Output format
      },
    },

    // Image optimization service
    image: {
      service: sharpImageService(),
    },

    markdown: {
      shikiConfig: {
        theme: "one-dark-pro",
        wrap: true,
      },
    },
  },
});
