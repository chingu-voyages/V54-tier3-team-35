import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Fix routing issue on Render
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true, 
  }
});
