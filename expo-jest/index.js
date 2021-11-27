const expoJest = require("./task");

module.exports = function task() {
  expoJest();
};

module.exports.description =
  "Add pre-configured eslint, prettier, pre-commit for expo apps";
