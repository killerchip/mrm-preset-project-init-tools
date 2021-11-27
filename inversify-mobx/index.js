const appTsxContent = `import 'reflect-metadata';
import './src/config/inversify/inversify';`;

module.exports = function task() {
  const execSync = require("child_process").execSync;
  const { lines, install, json, makeDirs } = require("mrm-core");
  const {
    copyFile,
    prependLinesToFile,
    fileExists,
    replaceLine,
  } = require("../utils");

  install(dependencies, { yarn: true, dev: false });

  // config TsConfig
  const tsConfigFile = json("tsconfig.json");
  const tsConfigTypes = tsConfigFile.get("compilerOptions.types") || [];
  const tsConfigNewContent = {
    compilerOptions: {
      types: tsConfigTypes.concat(["reflect-metadata"]),
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      useDefineForClassFields: true,
    },
  };
  tsConfigFile.merge(tsConfigNewContent).save();

  // Create inversify file
  copyFile(require.resolve("./inversify.ts"), "./src/config/inversify.ts");

  // import necessary stuff
  prependLinesToFile(appTsxContent, "./App.tsx");

  if (!fileExists("plopfile.ts")) {
    execSync("mrm plop --preset project-init-tools");
  }

  // add plop command
  makeDirs("./plops/addStore");
  copyFile(require.resolve("./plopIndex.ts"), "./plops/addStore/index.ts");

  copyFile(require.resolve("./store.ts.hbs"), "./plops/addStore/store.ts.hbs");

  // Modify plopfile
  replaceLine(
    "//--plop imports--",
    `import addStore from './plops/addStore'
    //--plop imports--`,
    "plopfile.ts"
  );

  replaceLine(
    "//--plop commands--",
    `addStore(plop)
    //--plop commands--`,
    "plopfile.ts"
  );
};

module.exports.description = "Installs and configures inversify";

const dependencies = [
  "inversify",
  "reflect-metadata",
  "mobx",
  "mobx-react-lite",
];
