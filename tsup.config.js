import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.js"],
  format: ["cjs", "esm"], // Add ESM format for modern packages
  loader: {
    ".js": "jsx",
  },
  external: [
    "react",
    "react-dom",
    "@emotion/react",
    "@emotion/styled",
    "@mui/material",
    "@mui/icons-material",
  ],
  dts: true, // let tsup auto-generate dts
  clean: true,
  splitting: false,
  bundle: true,
  skipNodeModulesBundle: true,
  target: "es2020",
  sourcemap: true,
  minify: false,
});
