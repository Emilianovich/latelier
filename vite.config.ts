import { defineConfig } from "vite-plus"

export default defineConfig({
	lint: {
		ignorePatterns: [
			"**/dist/**",
			"**/build/**",
			"**/.output/**",
			"**/.tanstack/**",
			"**/.turbo/**",
			"**/coverage/**",
			"**/*.gen.ts"
		],
		rules: {
			"no-console": ["error", { allow: ["warn", "error"] }],
			"no-restricted-imports": [
				"error",
				{
					patterns: [
						{
							regex: "^\\.{1,2}/.*\\.(?:js|mjs|cjs)$",
							message:
								"Usa la extensión del archivo fuente (.ts, .tsx, .mts o .cts), no la del JavaScript compilado."
						}
					]
				}
			]
		}
	},
	fmt: {
		useTabs: true,
		tabWidth: 2,
		printWidth: 80,
		endOfLine: "lf",
		semi: false,
		singleQuote: false,
		jsxSingleQuote: false,
		trailingComma: "none",
		arrowParens: "always",
		ignorePatterns: [
			"**/dist/**",
			"**/build/**",
			"**/.output/**",
			"**/.tanstack/**",
			"**/.turbo/**",
			"**/coverage/**",
			"**/*.gen.ts"
		]
	}
})
