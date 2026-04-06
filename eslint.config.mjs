import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
// import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
// import css from "@eslint/css";

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  js.configs.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    ...reactPlugin.configs.flat.recommended,

    plugins: {
      js,
      reactPlugin,
      "react-hooks": reactHooks,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // ...reactPlugin.configs.recommended.rules,
      // ...reactPlugin.configs["jsx-runtime"].rules,
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
      ...reactHooks.configs.recommended.rules,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // pluginReact.configs.flat.recommended,
  // {
  //   files: ["**/*.css"],
  //   plugins: { css },
  //   language: "css/css",
  //   extends: ["css/recommended"],
  // },
]);
