module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "*/tsconfig.json",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["simple-import-sort"],
  rules: {
    "no-duplicate-imports": "error",
    camelcase: "error",
    complexity: "warn",
    "default-case": "error",
    "default-case-last": "error",
    "default-param-last": "error",
    eqeqeq: "error",
    "max-lines": ["warn", 500],
    "no-console": "warn",
    "no-else-return": "error",
    "no-empty": "error",
    "no-empty-function": "error",
    "no-unneeded-ternary": "warn",
    "no-useless-return": "warn",
    "prefer-destructuring": [
      "warn",
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    "require-await": "warn",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^[a-z]"],
          ["^@"],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ["^.+\\.s?css$"],
          ["^\\u0000"],
        ],
      },
    ],
  },
};
