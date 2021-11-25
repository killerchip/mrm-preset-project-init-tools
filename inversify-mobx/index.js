module.exports = function task() {
  const execSync = require("child_process").execSync;
  const { lines, install, json, makeDirs } = require("mrm-core");

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

  // create inversify.ts file
  const inversifyTsFile = lines("./src/config/inversify.ts");
  inversifyTsFile.set([inversifyTsContent]).save();

  // import necessary stuff
  const appFile = lines("./App.tsx");
  const existingContent = appFile.get();
  appFile.set([appTsxContent].concat(existingContent)).save();

  const plopFileTs = lines("plopfile.ts");
  if (!plopFileTs.exists()) {
    execSync("mrm plop --preset project-init-tools");
  }

  // add plop command
  makeDirs("./plops/addStore");
  const plopIndexFile = lines("./plops/addStore/index.ts");
  plopIndexFile.set([plopFileIndexContent]).save();

  const plopFileStoreHbsContextFile = lines("./plops/addStore/store.ts.hbs");
  plopFileStoreHbsContextFile.set([plopFileStoreHbsContext]).save();

  // Modify plopfile
  const plopFile = lines("plopfile.ts");
  const existingLines = plopFile.get();
  const importPlaceIndex = existingLines.findIndex((line) =>
    line.includes("//--plop imports--")
  );
  const commandIndex = existingLines.findIndex((line) =>
    line.includes("//--plop commands--")
  );
  existingLines[importPlaceIndex] =
    `import addStore from './plops/addStore';\n` +
    existingLines[importPlaceIndex];

  existingLines[commandIndex] =
    `addStore(plop);\n` + existingLines[commandIndex];

  plopFile.set(existingLines).save();
};

module.exports.description = "Installs and configures inversify";

const dependencies = [
  "inversify",
  "reflect-metadata",
  "mobx",
  "mobx-react-lite",
];

const inversifyTsContent = `import { Container, interfaces } from 'inversify';
import { createContext, useContext, useState } from 'react';

const container = new Container({
  autoBindInjectable: true,
  defaultScope: 'Transient',
});

// Bind Classes in Singleton scope with a command like the following
// getRootContainer().bind(SingletonStore).toSelf().inSingletonScope();
//
// Do it in the same file where you declare the class to avoid
// file circular dependencies

export const getRootContainer = () => container;

export function useClassStore<T>(locator: interfaces.ServiceIdentifier<T>) {
  const [store] = useState(() => getRootContainer().get(locator));
  return store;
}

export function createStoreContext<T>(storeName?: string) {
  const Context = createContext<T | undefined>(undefined);

  const useStoreContext = () => {
    const store = useContext(Context);

    if (!store) {
      throw new Error(
        storeName + ': useContext error. No store passed to context'
      );
    }

    return store;
  };

  return {
    Context,
    useStoreContext,
  };
}
`;

const appTsxContent = `import 'reflect-metadata';
import './src/config/inversify/inversify';`;

const plopFileIndexContent = `import { NodePlopAPI } from 'plop';

export default function plopCommand(plop: NodePlopAPI) {
  return plop.setGenerator('addStore', {
    description: 'Creates a new Class Store that can be served by inversify',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Store name',
      },
      {
        type: 'input',
        name: 'targetFolder',
        message: 'specify install folder',
        default: 'src',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{targetFolder}}/{{pascalCase name}}.ts',
        templateFile: './plops/addStore/store.ts.hbs',
      },
    ],
  });
}
`;

const plopFileStoreHbsContext = `import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

@injectable()
class {{pascalCase name}} {
  constructor() {
    makeAutoObservable(this);
  }
}

// Use the following to register a class as singleton
// getRootContainer().bind({{pascalCase name}}).toSelf().inSingletonScope();

export const use{{pascalCase name}} = () => useClassStore({{pascalCase name}});

export const {
  Context: {{pascalCase name}}Context,
  useStoreContext: use{{pascalCase name}}Context,
} = createStoreContext<{{pascalCase name}}>();
`;
