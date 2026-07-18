import { defineConfig } from "vitest/config";
import path from "node:path";

// The game core (src/game) is fully headless, so the simulation suite runs in
// plain node — no browser, no React, whole lives played in milliseconds.
export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    setupFiles: ["src/game/tests/setup.ts"],
  },
});
