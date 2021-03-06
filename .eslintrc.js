module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "prettier/vue",
    // "plugin:@prettier/pug",
  ],
  plugins: ["vue", "prettier"],
  rules: {
    semi: [2, "never"],
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "prettier/prettier": [
      "error",
      {
        semi: false,
        printWidth: 80,
        arrayExpand: true,
        embeddedLanguageFormatting: "auto",
      },
    ],
    // "array-element-newline": ["error", "always"],
    // "array-bracket-newline": [
    //   "error",
    //   {
    //     minItems: 1,
    //   },
    // ],
  },
}
