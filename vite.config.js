import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	plugins: [react({ devTarget: "es2022" })],
	build: {
		target: "es2022",
		polyfills: false,
		minify: true,
		terser: {
			format: {
				comments: false,
			},
		},
		rollupOptions: {
			output: {
				chunkFileNames: "chunks/[name].[hash].js",
				assetFileNames: "assets/[name].[hash].[ext]",
			},
			manualChunks(id) {
				if (id.includes("react/")) {
					return "react-components";
				}

				return undefined;
			},
		},
	},
});
