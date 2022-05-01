module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // "eslint:recommended",
    // "plugin:vue/base",
    "plugin:vue/essential",
    // "plugin:vue/vue3-essential",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "vue/no-multiple-template-root": 2,
  },
};
