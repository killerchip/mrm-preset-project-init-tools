const expoEslint = require("./task");

module.exports = function task() {
  expoEslint();
};

module.exports.description =
  "Add pre-configured eslint, prettier, pre-commit for expo apps";
