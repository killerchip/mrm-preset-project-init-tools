const expoJest = require("./task");
const { printHeader } = require("../utils");


module.exports = function task() {
  printHeader();
  expoJest();
};

module.exports.description =
  "Add pre-configured eslint, prettier, pre-commit for expo apps";
