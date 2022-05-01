const Linter = require("eslint").Linter;
const linter = new Linter();

console.log(linter.getRules()); // "var foo = bar;"
