import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/static/dist/" : "/",
  build: {
    outDir: "gigpulse/static/dist",
    emptyOutDir: true,
    assetsDir: "assets"
  },
  server: {
    host: true,
    proxy: {
      // Proxy API requests to Django backend during development
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      }
    }
  }
}));
