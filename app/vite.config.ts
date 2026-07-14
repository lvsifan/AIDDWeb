import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
// `base` must match the GitHub Pages subpath: https://<user>.github.io/AIDDWeb/
export default defineConfig({
  base: '/AIDDWeb/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
