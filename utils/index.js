function installPackages(dependencies, dev) {
  const { install } = require("mrm-core");
  install(dependencies, { yarn: true, dev });
}

function installDevDependencies(dependencies) {
  installPackages(dependencies, true);
}

function installDependencies(dependencies) {
  installPackages(dependencies, false);
}

function loadText(path) {
  const fs = require("fs");
  return fs.readFileSync(path, "utf8");
}

function setFileContent(newContent, targetFile) {
  const { lines } = require("mrm-core");

  const plopFile = lines(targetFile);
  plopFile.set([newContent]).save();
}

function copyFile(source, target) {
  setFileContent(loadText(source), target);
}

module.exports = {
  installDevDependencies,
  installDependencies,
  loadText,
  setFileContent,
  copyFile,
};
