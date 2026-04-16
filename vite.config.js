import { defineConfig } from 'vite';

export default defineConfig({
  // WP чаще всего требует относительные пути для ассетов
  base: './',
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});

