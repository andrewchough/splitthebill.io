import _import from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import { fixupPluginRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
), {
    plugins: {
        import: fixupPluginRules(_import),
        "@typescript-eslint": typescriptEslint,
    },

    rules: {
        "import/order": ["error", {
            groups: ["builtin", "external", "internal", "parent", "sibling", "index", "type"],

            pathGroups: [{
                pattern: "react",
                group: "builtin",
                position: "before",
            }, {
                pattern: "next/**",
                group: "builtin",
                position: "before",
            }, {
                pattern: "@**",
                group: "external",
                position: "after",
            }, {
                pattern: "@/app/**",
                group: "internal",
            }, {
                pattern: "@/components/**",
                group: "internal",
            }, {
                pattern: "@/lib/**",
                group: "internal",
            }, {
                pattern: "@/public/**",
                group: "internal",
            }, {
                pattern: "@/utils/**",
                group: "internal",
            }],

            pathGroupsExcludedImportTypes: ["builtin"],
            "newlines-between": "always-and-inside-groups",

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },

            distinctGroup: false,
        }],

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
        }],

        "@typescript-eslint/no-explicit-any": [1],
    },
}];
