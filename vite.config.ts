import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  base: '/vl-vape-shop/',
  plugins: [react()],
});
