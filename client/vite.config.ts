import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist', // Ensure correct build output directory
  },
  server: {
    port: 5173,  // Default Vite port
    open: true,  // Auto-open browser
  },
  preview: {
    port: 4173, // Default preview port
  },
});
