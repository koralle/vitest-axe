import { defineConfig } from "tsup"

const entry = ["./src/index.ts", "./src/matchers.ts"]

export default defineConfig({
  entry,
  format: "esm",
  sourcemap: true,
  dts: true,
  outDir: "dist",
})
