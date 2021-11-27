const scriptsToAdd = {
  test: "jest",
};

module.exports = function expoJest() {
  const { packageJson } = require("mrm-core");

  const {
    installDevDependencies,
    addLinesToFile,
    copyFile,
  } = require("../utils");

  // Package JSON prepare
  installDevDependencies([
    "jest-expo",
    "react-test-renderer",
    "@types/jest",
    "@types/react-test-renderer",
  ]);

  const packageJsonFile = packageJson();
  Object.keys(scriptsToAdd).forEach((scriptName) =>
    packageJsonFile.setScript(scriptName, scriptsToAdd[scriptName])
  );
  packageJsonFile.save();

  addLinesToFile(["coverage"], ".gitignore", true);
  //   const gitIgnoreFile = lines(".gitignore");
  //   gitIgnoreFile.remove(gitignore).add(gitignore).save();

  copyFile(require.resolve("./resources/jest.config.js"), "jest.config.js");
  //   deleteFiles("jest.config.js");
  //   const jestConfigFile = lines("jest.config.js");
  //   jestConfigFile.add(jestConfig).save();

  copyFile(require.resolve("./resources/App.test.tsx"), "App.test.tsx");
  //   deleteFiles("App.test.tsx");
  //   const sampleTestFile = lines("App.test.tsx");
  //   sampleTestFile.add(sampleTest).save();
};

module.exports.description =
  "Add pre-configured eslint, prettier, pre-commit for expo apps";
