const { exec } = require("child_process");

module.exports = function task() {
  const {
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

  const gitIgnoreFile = lines(".gitignore");
  gitIgnoreFile.remove(gitignore).add(gitignore).save();

  deleteFiles("jest.config.js");
  const jestConfigFile = lines("jest.config.js");
  jestConfigFile.add(jestConfig).save();

  deleteFiles("App.test.tsx");
  const sampleTestFile = lines("App.test.tsx");
  sampleTestFile.add(sampleTest).save();
};

module.exports.description =
  "Add pre-configured eslint, prettier, pre-commit for expo apps";

const devDependenciesToInstall = [
  "jest-expo",
  "react-test-renderer",
  "@types/jest",
  "@types/react-test-renderer",
];

const scriptsToAdd = {
  test: "jest",
};

const jestConfig = `module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js','ts'],
  collectCoverage: true
};`;

const sampleTest = `import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON() as ReactTestRendererJSON;
    expect(tree?.children?.length).toBe(1);
    expect(tree).toMatchSnapshot();
  });
});`;

const gitignore = ["coverage"];
