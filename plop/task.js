const { copyFile, installDevDependencies, addLinesToFile } = require("../utils");

const devPackages = ["plop"];
const prettierIgnore = ["**/*.hbs"];

const commandsRootPath = "plops";

const plopConfigSourcePath = require.resolve("./resources/plopfile.js");
const plopConfigTargetPath = "plopfile.js";

const commandIndexSourcePath = require.resolve("./resources/plopCommand/index.js");
const commandTargetPath = commandsRootPath + "/plopCommand";
const commandIndexTargetFilePath = commandTargetPath + "/index.js";

const commandIndexHbsSourcePath = require.resolve("./resources/plopCommand/cmdIndex.hbs");
const commandIndexHbsTargetFilePath = commandTargetPath + "/cmdIndex.hbs";

const commandGeneratedSourcePath = require.resolve(
  "./resources/plopCommand/cmdGenerated.hbs"
);
const commandGeneratedTargetFilePath = commandTargetPath + "/cmdGenerated.hbs";

module.exports = function plop() {
  const { makeDirs } = require("mrm-core");

  // Install Plop package
  installDevDependencies(devPackages);

  // Add Prettier Ignore file
  addLinesToFile(prettierIgnore, '.prettierIgnore', true)

  // Base plopfile config
  copyFile(plopConfigSourcePath, plopConfigTargetPath);

  // Plop Command
  makeDirs(commandsRootPath);
  makeDirs(commandTargetPath);

  // Plop Command index.js
  copyFile(commandIndexSourcePath, commandIndexTargetFilePath);

  // Plop Command plopCommandIndex.hbs
  copyFile(commandIndexHbsSourcePath, commandIndexHbsTargetFilePath);

  // Plop Command plopCommandHbs.hbs
  copyFile(commandGeneratedSourcePath, commandGeneratedTargetFilePath);
};

