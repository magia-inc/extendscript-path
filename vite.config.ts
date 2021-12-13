import { defineConfig } from "vite";
import { dependencies } from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: "src/cli.ts",
      name: "extendscript-path",
      fileName: (format) => `extendscript-path.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [...Object.keys(dependencies), "fs/promises"],
    },
    target: "es2020",
    sourcemap: true,
  },
});
