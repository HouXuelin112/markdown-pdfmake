import { createHtmlPlugin } from 'vite-plugin-html';

import { defineConfig } from 'vite-plus';

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      pages: [
        {
          entry: './example/index.ts',
          filename: 'index.html',
          template: 'index.html',
        },
        {
          entry: './example/index.ts',
          filename: 'example.html',
          template: 'example.html',
        },
      ],
    }),
  ],
});
