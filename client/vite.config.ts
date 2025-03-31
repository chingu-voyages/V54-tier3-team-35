import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const API_URL = "https://v54-tier3-team-35-bvab.onrender.com";

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: './dist',
  },
  server: {
    port: 5173,
    proxy: {
      "/users": {
        target: API_URL,
        changeOrigin: true,
        secure: false
      },
      "/queries": {
        target: API_URL,
        changeOrigin: true,
        secure: false
      },
      "/query-ai": {
        target: API_URL,
        changeOrigin: true,
        secure: false
      }
    }
  }
});