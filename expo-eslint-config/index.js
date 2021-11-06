module.exports = function task() {
  const { json, install, packageJson, lines } = require("mrm-core");

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
};

// CONTINUE HERE WITH PREPARING HUSKY

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
