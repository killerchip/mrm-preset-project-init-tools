const inversifyMobx = require("./task");
const { printHeader } = require("../utils");


module.exports = function task() {
  printHeader();
  inversifyMobx();
};

module.exports.description = "Installs and configures inversify";
