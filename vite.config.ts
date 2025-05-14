import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: fileURLToPath(new URL("./src", import.meta.url)),
      "@": "./src",
      "@components": "./src/components",
      "@services": "./src/gen/services",
      "@pages": "./src/pages",
    },
  },
});
