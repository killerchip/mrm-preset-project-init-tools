module.exports = function task() {
  const { lines, install, json } = require("mrm-core");

  install(dependencies, { yarn: true, dev: false });

  // config TsConfig
  const tsConfigFile = json("tsconfig.json");
  const tsConfigTypes = tsConfigFile.get("compilerOptions.types") || [];
  const tsConfigNewContent = {
    compilerOptions: {
      types: tsConfigTypes.concat(["reflect-metadata"]),
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
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
};

module.exports.description = "Installs and configures inversify";

const dependencies = ["inversify", "reflect-metadata"];

const inversifyTsContent = `import { Container, interfaces } from 'inversify';
import { createContext, useContext, useState } from 'react';

const container = new Container({
  autoBindInjectable: true,
  defaultScope: 'Transient',
});

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
