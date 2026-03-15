import tsdownConfig from './tsdown.config.ts';

import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*.{js,ts}': 'vp check --fix',
  },
  fmt: {
    arrowParens: 'avoid',
    semi: true,
    tabWidth: 2,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
  },
  pack: tsdownConfig,
  lint: { options: { typeAware: true, typeCheck: true } },
});
