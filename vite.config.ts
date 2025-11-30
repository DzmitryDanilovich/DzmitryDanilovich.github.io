import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  base: '/',
  plugins: [
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: true,
      },
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild', // Vite uses esbuild by default, which is very fast
  }
});
