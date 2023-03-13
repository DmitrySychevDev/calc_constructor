// vite.config.js

import checker from "vite-plugin-checker";
import eslintPlugin from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import postcssConfig from "./postcss.config.cjs";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    eslintPlugin({
      cache: false,
      include: "./src/**/*.{ts,tsx}",
      exclude: [],
    }),
    checker({
      typescript: true,
      overlay: true,
    }),
  ],
  resolve: {
    alias: {
      "@": `$/src`,
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
