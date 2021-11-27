const appTsxContent = `import 'reflect-metadata';
import './src/config/inversify/inversify';`;

module.exports = function inversifyMobx() {
  const { json, makeDirs } = require("mrm-core");
  const {
    installDependencies,
    copyFile,
    prependLinesToFile,
    fileExists,
    replaceLine,
  } = require("../utils");
  const installPlop = require("../plop/task");

  installDependencies([
    "inversify",
    "reflect-metadata",
    "mobx",
    "mobx-react-lite",
  ]);

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
    installPlop();
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
