import { defineConfig } from 'vite-plus/pack';

export default defineConfig({
  entry: {
    index: './src/index.ts',
    font: './src/font/index.ts',
  },
  dts: {
    tsgo: true,
  },
  exports: true,
});
