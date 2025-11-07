import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["node_modules", "dist"],

    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    plugins: {
      prettier,
    },

    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: true,
          tabWidth: 2,
          singleQuote: true,
          trailingComma: "none",
          printWidth: 100,
        },
      ],
    },

    extends: [js.configs.recommended, "plugin:prettier/recommended"],
  },
]);
