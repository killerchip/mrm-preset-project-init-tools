import { Container, interfaces } from "inversify";
import { createContext, useContext, useState } from "react";

const container = new Container({
  autoBindInjectable: true,
  defaultScope: "Transient",
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
        storeName + ": useContext error. No store passed to context"
      );
    }

    return store;
  };

  return {
    Context,
    useStoreContext,
  };
}
