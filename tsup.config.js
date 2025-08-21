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
    "react-phone-input-2",
    "@tiptap/react",
    "@mantine/tiptap",
    "@tabler/icons-react",
    "@mantine/core",
    "@tiptap/extension-color",
    "@tiptap/extension-highlight",
    "@tiptap/extension-link",
    "@tiptap/extension-placeholder",
    "@tiptap/extension-subscript",
    "@tiptap/extension-superscript",
    "@tiptap/extension-text-align",
    "@tiptap/extension-text-style",
    "@tiptap/extension-underline",
    "@tiptap/starter-kit",
    "react-dropzone",
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
