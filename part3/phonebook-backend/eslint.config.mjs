import globals from "globals";
import { defineConfig } from "eslint/config";
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default defineConfig([
  js.configs.recommended,
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs", globals: {...globals.node} }},
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  
]);
