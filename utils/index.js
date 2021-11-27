function installPackages(dependencies, dev) {
  const { install } = require("mrm-core");
  install(dependencies, { yarn: true, dev });
}

function installDevDependencies(dependencies) {
  return installPackages(dependencies, true);
}

function installDependencies(dependencies) {
  return installPackages(dependencies, false);
}

function loadText(path) {
  const fs = require("fs");
  return fs.readFileSync(path, "utf8");
}

function overwriteFileContent(newContent, targetFile) {
  const { lines, deleteFiles } = require("mrm-core");

  deleteFiles(targetFile);
  const plopFile = lines(targetFile);
  plopFile.add(newContent).save();
}

module.exports = {
  loadText,
  overwriteFileContent,
  installDevDependencies,
  installDependencies,
};
