import { defineConfig, configDefaults } from "vitest/config"

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["tests/setupTests.ts"],
    watch: false,
    coverage: {
      include: ["**/*.test.{ts,js}"],
      exclude: [...configDefaults.exclude],
    },
  },
})
