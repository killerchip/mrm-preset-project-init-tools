const { exec } = require("child_process");
const {
  installDevDependencies,
  uninstallDevDependencies,
  mergeToJson,
  addLinesToFile,
  copyFile,
} = require("../utils");

const scriptsToAdd = {
  lint: "tsc --noEmit && eslint .",
  pretty: "prettier --write .",
  "husky:prepare": "husky install",
  "pre-commit": "pretty-quick --staged",
};

const HUSKY_PATH = "./.husky";

function execCli(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

module.exports = function expoEslint() {
  const {
    packageJson,
  } = require("mrm-core");

  // Package JSON prepare
  const packages = [
    "eslint",
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "eslint-config-prettier",
    "eslint-config-universe",
    "eslint-plugin-prettier",
    "eslint-plugin-react-native",
    "husky",
    "prettier",
    "pretty-quick",
  ];

  uninstallDevDependencies(packages);
  installDevDependencies(packages);

  const packageJsonFile = packageJson();
  Object.keys(scriptsToAdd).forEach((scriptName) =>
    packageJsonFile.setScript(scriptName, scriptsToAdd[scriptName])
  );
  packageJsonFile.save();

  // Eslint
  copyFile(require.resolve("./resources/.eslintrc.json"), ".eslintrc.json");

  addLinesToFile(
    ["node_modules", "**/*.js", "coverage", "**/*.hbs"],
    ".eslintignore",
    true
  );

  // Prettier
  copyFile(require.resolve("./resources/.prettierrc.json"), ".prettierrc");
  addLinesToFile(
    ["node_modules", "coverage", "yarn-error.log", ".expo"],
    ".prettierignore"
  );

  copyFile(require.resolve("./resources/.prettierignore"), ".prettierignore");
  addLinesToFile(
    ["node_modules", "coverage", "yarn-error.log", ".expo", "**/*.hbs"],
    ".prettierignore"
  );

  // husky
  execCli("yarn husky:prepare");

  copyFile(
    require.resolve("./resources/pre-commit"),
    HUSKY_PATH + "/pre-commit"
  );
  execCli("chmod +x " + HUSKY_PATH + "/pre-commit");
};

module.exports.description =
  "Add pre-configured eslint, prettier, pre-commit for expo apps";

const preCommitScript = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn pre-commit
`;
