module.exports = function task() {
  const { json, install, packageJson } = require("mrm-core");

  // Package JSON prepare
  install(devDependenciesToInstall, { yarn: true });

  const packageJsonFile = packageJson();

  Object.keys(scriptsToAdd).forEach((scriptName) =>
    packageJsonFile.setScript(scriptName, scriptsToAdd[scriptName])
  );
  packageJsonFile.save();

  // const eslintrc = json(".eslintrc.json");

  // if (!eslintrc.exists()) {
  //   throw new Error(".eslintrc.json was not found");
  // }
};

module.exports.description =
  "Add pre-configured eslint, prettier, pre-commit for expo apps";

const devDependenciesToInstall = [
  "eslint",
  "@typescript-eslint/parser",
  "eslint-config-prettier",
  "eslint-config-universe",
  "eslint-plugin-prettier",
  "husky",
  "prettier",
  "pretty-quick",
];

const scriptsToAdd = {
  lint: "tsc --noEmit && eslint .",
  pretty: "prettier --write .",
  "husky:prepare": "husky install",
  "pre-commit": "pretty-quick --staged",
};
