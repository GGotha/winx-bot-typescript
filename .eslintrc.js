const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    node: true
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  plugins: ["import", "import-helpers"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    projects: [path.resolve("tsconfig.json")]
  },
  rules: {
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/no-cycle": "off",
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: [
          "/^react/",
          "module",
          "/^~\\//",
          ["parent", "sibling", "index"]
        ],
        alphabetize: { order: "asc", ignoreCase: true }
      }
    ],
    "import/extensions": [
      "error",
      "always",
      {
        ts: "never",
        tsx: "never",
        js: "never",
        jsx: "never"
      }
    ]
  },
  settings: {
    "import/extensions": [".js", ".ts"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    },
    "import/resolver": {
      typescript: {}
    }
  }
};
