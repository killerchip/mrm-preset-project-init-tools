const { exec } = require("child_process");

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

module.exports = function task() {
  const {
    json,
    install,
    packageJson,
    lines,
    deleteFiles,
  } = require("mrm-core");

  // Package JSON prepare
  install(devDependenciesToInstall, { yarn: true });

  const packageJsonFile = packageJson();

  Object.keys(scriptsToAdd).forEach((scriptName) =>
    packageJsonFile.setScript(scriptName, scriptsToAdd[scriptName])
  );
  packageJsonFile.save();

  // Eslint
  const eslintrcFile = json(".eslintrc.json");
  eslintrcFile.merge(eslintrc).save();

  const eslintignoreFile = lines(".eslintignore");
  eslintignoreFile.remove(eslintignore).add(eslintignore).save();

  // Prettier
  const prettierrcFile = json(".prettierrc");
  prettierrcFile.merge(prettierrc).save();

  const prettierignoreFile = lines(".prettierignore");
  prettierignoreFile.remove(prettierignore).add(prettierignore).save();

  // husky
  execCli("yarn husky:prepare");

  deleteFiles(HUSKY_PATH + "/pre-commit");
  const preCommitScriptFile = lines(HUSKY_PATH + "/pre-commit");
  preCommitScriptFile.add(preCommitScript).save();
  execCli("chmod +x " + HUSKY_PATH + "/pre-commit");
};

module.exports.description =
  "Add pre-configured eslint, prettier, pre-commit for expo apps";

const devDependenciesToInstall = [
  "eslint",
  "@typescript-eslint/eslint-plugin",
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

const eslintrc = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "universe",
    "universe/shared/typescript-analysis",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
      ecmaFeatures: {
        jsx: true,
      },
    },
  ],
  rules: {
    "prettier/prettier": 1,
  },
};

const eslintignore = ["node_modules", "**/*.js", "coverage"];

const prettierrc = {
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSameLine: false,
};

const prettierignore = ["node_modules", "coverage"];

const preCommitScript = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn pre-commit
`;
const HUSKY_PATH = "./.husky";
