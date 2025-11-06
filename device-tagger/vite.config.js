import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Device-Tagger/', // <- set repo subpath so built assets are served from /Device-Tagger/
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});