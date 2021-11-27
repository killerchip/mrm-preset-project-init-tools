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

module.exports = { loadText, overwriteFileContent };
