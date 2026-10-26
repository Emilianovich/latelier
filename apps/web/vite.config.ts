import { defineConfig } from "vite-plus"
import { devtools } from "@tanstack/devtools-vite"

import { tanstackStart } from "@tanstack/react-start/plugin/vite"

import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { cloudflare } from "@cloudflare/vite-plugin"

// Unit tests run in Node, without the application's Worker/SSR runtime.
const isTest = Boolean(process.env.VITEST)

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		!isTest && devtools(),
		!isTest && cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
		!isTest && tanstackStart(),
		viteReact()
	]
})

export default config
