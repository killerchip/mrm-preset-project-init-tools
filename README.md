# mrm-preset-project-init-tools

> A set of opinionated configuration tools for fast initialize of Expo, React-Native, React projects.

This package contains a set of tasks that can be executed via [`mrm`](https://github.com/sapegin/mrm).

When they run on top of a corresponding project, they automatically install packages and create/modify configuration files as needed, to set up the requested features.

They are strongly opinionated. But you can use them to quickly perform initial configuration and then fine-tune to your liking.

Currently, the tasks included are:

- [expo-eslint](#expo-eslint): A base configuration of eslint, prettier, and husky automation for expo projects.
- [expo-jest](#expo-jest): Base configuration with `expo-jest` on Typescript project.

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

## Overriding

If you want to override or modify the configurations an easy way would be to

1. Clone the repository locally
2. Make modify the tasks to your liking
3. Launch your task from the local repository with the following commander

```
mrm <task> --dir <path/to/your/locally/cloned/repository>
```

See [`mrm` documentation](https://mrm.js.org/docs/getting-started) for more details on how to modify or create your own tasks and presets.
