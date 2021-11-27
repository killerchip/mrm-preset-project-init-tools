const { copyFile, installDevDependencies, addLinesToFile } = require("../utils");

const devPackages = ["plop"];
const prettierIgnore = ["**/*.hbs"];

const commandsRootPath = "plops";

const plopConfigSourcePath = require.resolve("./plopfile.ts");
const plopConfigTargetPath = "plopfile.ts";

const commandIndexSourcePath = require.resolve("./plopCommand/index.ts");
const commandTargetPath = commandsRootPath + "/plopCommand";
const commandIndexTargetFilePath = commandTargetPath + "/index.ts";

const commandIndexHbsSourcePath = require.resolve("./plopCommand/cmdIndex.hbs");
const commandIndexHbsTargetFilePath = commandTargetPath + "/cmdIndex.hbs";

const commandGeneratedSourcePath = require.resolve(
  "./plopCommand/cmdGenerated.hbs"
);
const commandGeneratedTargetFilePath = commandTargetPath + "/cmdGenerated.hbs";

module.exports = function task() {
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

  // Plop Command index.ts
  copyFile(commandIndexSourcePath, commandIndexTargetFilePath);

  // Plop Command plopCommandIndex.hbs
  copyFile(commandIndexHbsSourcePath, commandIndexHbsTargetFilePath);

  // Plop Command plopCommandHbs.hbs
  copyFile(commandGeneratedSourcePath, commandGeneratedTargetFilePath);
};

module.exports.description = "Add plop package (code generator tool)";

