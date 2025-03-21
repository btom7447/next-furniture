import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "plugin:@typescript-eslint/recommended"), // ✅ Added TypeScript support
  {
    ignores: ["node_modules", ".next", "out", "dist"], // ✅ Ignore build folders
    plugins: ["@typescript-eslint"], // ✅ Explicitly add the TypeScript plugin
    rules: {
      "react/no-unescaped-entities": "off",
      "no-console": "warn",
      "no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
