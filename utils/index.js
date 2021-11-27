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

function addLinesToFile(newLines, filePath, forceCreate) {
  const { lines } = require("mrm-core");
  const file = lines(filePath);

  if (file.exists() || forceCreate) {
    file.remove(newLines).add(newLines).save();
  }
}

function prependLinesToFile(newLines, filePath, forceCreate) {
  const { lines } = require("mrm-core");
  const file = lines(filePath);
  const existingContent = file.get();

  const newContentArray = Array.isArray(newLines) ? newLines : [newLines];

  if (file.exists() || forceCreate) {
    file.set(newContentArray.concat(existingContent)).save();
  }
}

function replaceLine(line, newLine, filePath, fullLineOnly){
  const { lines } = require("mrm-core");
  const file = lines(filePath);
  const content = file.get();

  const newContent = content.map(lineItem => {
    if (fullLineOnly && lineItem === line) {
      return newLine;
    }

    if (lineItem.includes(line)) {
      return newLine;
    }

    return lineItem;
  })

  file.set(newContent).save();
}

function fileExists(path) {
  const { lines } = require("mrm-core");
  const file = lines(path);

  return file.exists();
}

module.exports = {
  installDevDependencies,
  installDependencies,
  loadText,
  setFileContent,
  addLinesToFile,
  prependLinesToFile,
  replaceLine,
  copyFile,
  fileExists
};
