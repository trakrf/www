import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://trakrf.id',
	server: {
		// Bind to all network interfaces, not just localhost
		host: true
	},
	integrations: [
		tailwind({
			// Allow custom base styles (DaisyUI needs this)
			applyBaseStyles: true
		})
	],
	// Static site generation (no SSR needed for marketing site)
	output: 'static'
});
