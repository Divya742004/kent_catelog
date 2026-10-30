import { defineConfig } from 'vite'; import react from '@vitejs/plugin-react';
// On Vercel the site is served from the domain root; locally it stays at /catalog/
export default defineConfig({ plugins: [react()], base: process.env.VERCEL ? '/' : '/catalog/' });