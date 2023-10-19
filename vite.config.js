// vite.config.ts
import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'image-slider',
      fileName: 'image-slider',
    },
  },
  plugins: [dts()],
  resolve: {
    "@": path.resolve(__dirname, "./src"),
    "~": path.resolve(__dirname, "./src"),
  }
});