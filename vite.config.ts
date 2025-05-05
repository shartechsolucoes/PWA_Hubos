import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			devOptions: {
				enabled: true,
				type: 'module',
			},
			manifest: {
				name: 'GeoOS',
				short_name: 'GeoOS',
				description: 'PWA for Hubos application, to install on smartphones',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				start_url: '/',
				display: 'standalone',
				icons: [
					{
						src: 'logo_new.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'logo_new.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
				navigateFallback: 'index.html',
				navigateFallbackAllowlist: [/^\/$/, /^\/orders\/form/],
				navigateFallbackDenylist: [/^\/api\//],
				runtimeCaching: [
					{
						// Cache de API com fallback para offline
						urlPattern: /^https:\/\/.*\/api\/.*$/,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'api-cache',
							networkTimeoutSeconds: 10,
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24, // 1 dia
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
					{
						// Imagens
						urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'image-cache',
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 60 * 60 * 24 * 30, // 30 dias
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
					{
						// Recursos estáticos (html, js, css)
						urlPattern: /\.(?:js|css|html)$/,
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'static-resources',
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
			},
		}),
	],
});
