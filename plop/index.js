const plop = require("./task");
const { printHeader } = require("../utils");


module.exports = function task() {
  printHeader();
  plop();
};

module.exports.description = "Add plop package (code generator tool)";
