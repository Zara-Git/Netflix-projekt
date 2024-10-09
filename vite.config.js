import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setUpTests.js',
    include: ['src/**/*.test.{js,jsx}'],
    exclude: ['node_modules', 'dist'],
  },
});
