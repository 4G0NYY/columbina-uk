import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Apex custom domain (columbina.uk) serves from the root, so base is "/".
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        // React/Router and Framer Motion never change between app deploys, so
        // they get their own long-lived chunks instead of being re-hashed into
        // the app bundle on every content edit.
        codeSplitting: {
          groups: [
            { name: "react", test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/ },
            { name: "motion", test: /node_modules[\\/]framer-motion[\\/]/ },
          ],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "node",
  },
});
