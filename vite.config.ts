import { defineConfig } from "vite";
import { devDependencies } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: "src/cli.ts",
      name: "extendscript-path",
      fileName: (format) => `extendscript-path.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [...Object.keys(devDependencies), "fs/promises"],
    },
    target: "es2020",
    sourcemap: true,
  },
});
