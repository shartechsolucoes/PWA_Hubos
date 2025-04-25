import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
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
				description: 'PWA for Hubos application, to installs in the smartphone',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'logo_new.png',
						sizes: '192x192',
						type: 'image/svg+xml',
					},
					{
						src: 'logo_new.png',
						sizes: '512x512',
						type: 'image/svg+xml',
					},
				],
			},
			// workbox: {
			// 	// defining cached files formats
			// 	globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
			// },
		}),
	],
});
