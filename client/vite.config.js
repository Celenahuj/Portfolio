import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    target: "esnext", //browsers can handle the latest ES features
  },
  plugins: [tailwindcss()],
  base: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '/',
  server: {
    proxy: {
      '/api': {
        target: 'https://mmi.unilim.fr/~hujol3/SAE301',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});