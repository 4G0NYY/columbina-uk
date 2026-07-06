import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Apex custom domain (columbina.uk) serves from the root, so base is "/".
export default defineConfig({
  base: "/",
  plugins: [react()],
  test: {
    globals: true,
    environment: "node",
  },
});
