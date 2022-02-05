const expoEslint = require("./task");
const { printHeader } = require("../utils");

module.exports = function task() {
  printHeader();
  expoEslint();
};

module.exports.description =
  "Add pre-configured eslint, prettier, pre-commit for expo apps";
