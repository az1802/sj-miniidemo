module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard", "plugin:vue/recommended", "prettier"],
  globals: {
    a: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
