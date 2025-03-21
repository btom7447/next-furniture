import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["node_modules", ".next", "out"], // Ignore unnecessary directories
    rules: {
      "react/no-unescaped-entities": "off", // Allow unescaped entities
      "no-console": "warn", // Show console warnings but don't break build
      "no-unused-vars": "warn", // Prevent unused variables from breaking build
      "@typescript-eslint/no-explicit-any": "warn", // Allow 'any' but warn
    },
  },
];

// Disable ESLint checks if NEXT_DISABLE_ESLINT is set
if (process.env.NEXT_DISABLE_ESLINT === "1") {
  eslintConfig.push({
    rules: {
      "react/no-unescaped-entities": "off",
      "no-console": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  });
}

export default eslintConfig;