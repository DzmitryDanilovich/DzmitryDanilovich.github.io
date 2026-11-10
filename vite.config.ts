import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  base: '/',
  plugins: [
    ViteImageOptimizer({
      // Raster images only: optimizing SVG needs the optional `svgo` package,
      // and the one SVG in the build (the favicon) is already under 2 kB.
      test: /\.(jpe?g|png|webp)$/i,
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
    minify: 'esbuild',
  }
});
