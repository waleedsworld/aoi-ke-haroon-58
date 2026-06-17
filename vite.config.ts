import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Split large third-party libraries into their own long-term-cacheable
    // chunks instead of one monolithic bundle. Recharts + d3 in particular are
    // heavy and only used on a couple of routes, so isolating them keeps the
    // initial payload small and lets the browser cache vendor code across deploys.
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          charts: ["recharts"],
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
});
