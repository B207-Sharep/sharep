import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@apis', replacement: '/src/apis/' },
      { find: '@stores', replacement: '/src/stores/' },
      { find: '@types', replacement: '/src/types/' },
      { find: '@pages', replacement: '/src/pages/' },
      { find: '@customhooks', replacement: '/src/customhooks/' },
      { find: '@styles', replacement: '/src/styles/' },
      { find: '@constrants', replacement: '/src/constrants/' },
      { find: '@components', replacement: '/src/components/' },
    ],
  },
});
