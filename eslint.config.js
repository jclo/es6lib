import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      globals: {
        // ...globals.browser // Add browser global variables
        ...globals.node // Add Node.js global variables
      }
    },

    plugins: {
      import: importPlugin
    },

    rules: {
      // ========================
      // 🔒 Style proche Airbnb
      // ========================
      "strict": ["error", "global"],
      "func-names": ["error", "never"],

      "space-before-function-paren": ["error", {
        anonymous: "never",
        named: "never",
        asyncArrow: "always"
      }],

      "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],

      "no-multi-spaces": ["error", {
        exceptions: { VariableDeclarator: true }
      }],

      "comma-style": ["error", "first", {
        exceptions: {
          ArrayExpression: true,
          ObjectExpression: true
        }
      }],

      "indent": ["error", 2, {
        SwitchCase: 1,
        VariableDeclarator: { const: 2 }
      }],

      "no-multiple-empty-lines": ["error", {
        max: 2,
        maxEOF: 0
      }],

      // ========================
      // 📦 Imports (Airbnb core)
      // ========================
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/no-duplicates": "error",
      "import/export": "error",
      "import/extensions": ["error", "ignorePackages"],

      // ========================
      // 🧹 Bonnes pratiques Airbnb
      // ========================
      "no-var": "error",
      "prefer-const": "error",
      "object-shorthand": ["error", "always"],
      "no-unused-vars": ["warn"],

      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],

      // ========================
      // ⚠️ Airbnb tolérances
      // ========================
      "no-console": "warn",
      "no-underscore-dangle": "off",

      // ========================
      // 🧩 Tes overrides existants
      // ========================
      // (déjà intégrés ci-dessus)
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "no-mixed-spaces-and-tabs": "error",
      "semi": ["error", "always"],
    }
  }
];
