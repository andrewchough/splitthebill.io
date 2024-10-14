import eslint from "@eslint/js";

import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["**/build/**", "**/dist/**", "**/node_modules/**", "**/.next/**"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: importPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "type",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "next/**",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@/app/**",
              group: "internal",
            },
            {
              pattern: "@/components/**",
              group: "internal",
            },
            {
              pattern: "@/lib/**",
              group: "internal",
            },
            {
              pattern: "@/public/**",
              group: "internal",
            },
            {
              pattern: "@/utils/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always-and-inside-groups",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          distinctGroup: false,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": ["warn"],
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@next/next/no-html-link-for-pages": "error",
    },
  },
];
