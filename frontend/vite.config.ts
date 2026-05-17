import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa-icon.svg', 'apple-touch-icon.svg'],
      manifest: {
        name: 'Centro Veterinario Animalitos',
        short_name: 'Animalitos',
        description: 'Registro de ingresos del Centro Veterinario Animalitos',
        theme_color: '#2563eb',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        lang: 'es',
        icons: [
          {
            src: 'pwa-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'pwa-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      // Activa el service worker también en npm run dev
      devOptions: {
        enabled: true,
        type: 'module',
      },
      workbox: {
        // Precacha todos los assets del build (JS, CSS, HTML)
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],

        // Estrategia para las llamadas a la API: NetworkFirst con caché de respaldo
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24 horas
              },
              networkTimeoutSeconds: 5,
            },
          },
        ],

      },
    }),
  ],
});
