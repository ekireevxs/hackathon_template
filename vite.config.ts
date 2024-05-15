/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rollupReplace from '@rollup/plugin-replace';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['node_modules'],
  },
  plugins: [
    // Problem with types in the package https://github.com/rollup/plugins/issues/1541
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        'process.env.NODE_ENV': JSON.stringify('development'),
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
});
