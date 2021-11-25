# mrm-preset-project-init-tools

> A set of opinionated configuration tools for fast initialize of Expo, React-Native, React projects.

This package contains a set of tasks that can be executed via [`mrm`](https://github.com/sapegin/mrm).

When they run on top of a corresponding project, they automatically install packages and create/modify configuration files as needed, to set up the requested features.

They are strongly opinionated. But you can use them to quickly perform initial configuration and then fine-tune to your liking.

Currently, the tasks included are:

- [expo-eslint](#expo-eslint): A base configuration of eslint, prettier, and husky automation for expo projects.
- [expo-jest](#expo-jest): Base configuration with `expo-jest` on Typescript project.
- [plop](#plop): Installs the [`plop`](https://www.npmjs.com/package/plop) code generator and command to easily create a starter for custom commands.

## How to use tools

Install the `mrm` package first. Prefer to install it globally:

```
npm install -g mrm
```

or with `yarn`

```
yarn global add mrm
```

Then you can run any task with the following command

```
mrm <task> --preset project-init-tools
```

Where <task> is one of the included tasks below

## expo-eslint

```
mrm expo-eslint --preset project-init-tools
```

Installs `eslint`,`prettier`,`husky`+`pre-commit` for running eslint in your code.

The task is designed for `typescript` projects initiated with `expo init`, but it can apply to bare workflow `react-native` projects.

Adds the following scripts

- `lint`: Runs eslint rules on all typescript files including `prettier` checks
- `pretty`: Runs `prettier` on all project files and formats them properly.

It also sets up `husky` and `pre-commit` hook, so when you commit staged files they are automatically properly formatted before they commit.

## expo-jest

```
mrm expo-jest --preset project-init-tools
```

Install `expo-jest` in the project with proper configuration for running the tests in Typescript. Based on instructions from [official Expo documentation](https://docs.expo.dev/guides/testing-with-jest/)

## plop

```
mrm plop --preset project-init-tools
```

Installs [`plop`](https://www.npmjs.com/package/plop) code generator. You can create custom "plop commands" that will in turn generate custom boiler plate file in your code.

It installs also "plop command" `plopCommand` that creates a boilerplate code for generating your own next command.

Once installed, you can run at anytime

```
yarn plop plopCommand
```

It will ask you for the new command name and the command config files path (by default `plops`).

For more information on how use plop and add your own code templates see [https://www.npmjs.com/package/plop](https://www.npmjs.com/package/plop)

## inversify & mobx

Installs [inversifyJS](https://inversify.io/) DI/IOC framework and [Mobx](https://mobx.js.org/) state management.

```
mrm plop --preset project-init-tools
```

If not already present, it will install also `plop` (see above).

### inversify

A file `src/config/inversify.ts` is created, which initiates a container.
The container configured with options:

```
  autoBindInjectable: true,
  defaultScope: 'Transient'
```

and exports a function to get the container

```
export const getRootContainer = () => container;
```

### store template

The scripts also creates a plop file that allows you to generate a starter class-based mobx store.

```
yarn plop addStore <StoreName> <target_folder>
```

It will generate a starter class. For example:

```
@injectable()
class MyStore {
  constructor() {
    makeAutoObservable(this);
  }
}
```

Which can be requested from inversify root container as:

```
const myStoreInstance = getRootContainer().get(MyStore)
```

### bind in singleton mode

By default Classes are bound in 'transient' mode. To bind in singleton mode, you can bind it right after the class declaration. Example:

```
getRootContainer().bind(MyStore).toSelf().inSingletonScope();
```

### request an instance via hook

Each store file exports a React-hook that allows you to get an instance directly from within a React component. For example, it exports:

```
export const useMyStore = () => useClassStore(MyStore);
```

and inside your component you can get an instance by using this hook:

```
const myStore = useMyStore();
```

### Store Context

In case you wish to pass a specific store instance from a parent component to a child component, you can use the pre-declared Context of the store:

```
export const {
  Context: myStoreContext,
  useStoreContext: useMyStoreContext,
} = createStoreContext<MyStore>();
```

So then in your parent component after you get an instance, you pass it into context. For example:

```
const myStore = useMyStore();
...
<MyStoreContext.Provider value={myStore}>
    // child components
</MyStoreContext.Provider value={myStore}>
```

And in you child components

```
const myStore = useMyStoreContext()
```

This is especially useful when your stores are 'transients' and you want to pass them down your React tree.

## Overriding

If you want to override or modify the configurations an easy way would be to

1. Clone the repository locally
2. Make modify the tasks to your liking
3. Launch your task from the local repository with the following commander

```
mrm <task> --dir <path/to/your/locally/cloned/repository>
```

See [`mrm` documentation](https://mrm.js.org/docs/getting-started) for more details on how to modify or create your own tasks and presets.
