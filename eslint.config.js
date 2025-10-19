import eslintPluginAstro from 'eslint-plugin-astro';

export default [
	// Recommended Astro config
	...eslintPluginAstro.configs.recommended,
	{
		rules: {
			// Customize rules if needed
			'astro/no-set-html-directive': 'error'
		}
	}
];
