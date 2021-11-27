const { loadText, copyFile, installDevDependencies } = require("../utils");

const devPackages = ["plop"];

const commandsRootPath = "plops";

const plopConfigSourcePath = require.resolve("./plopfile.ts");
const plopConfigTargetPath = "plopfile.ts";

const commandIndexSourcePath = require.resolve("./plopCommand/index.ts");
const commandTargetPath = commandsRootPath + "/plopCommand";
const commandIndexTargetFilePath = commandTargetPath + "/index.ts";

const commandIndexHbsSourcePath = require.resolve('./plopCommand/cmdIndex.hbs');
const commandIndexHbsTargetFilePath = commandTargetPath + '/cmdIndex.hbs'

module.exports = function task() {
  const { lines, deleteFiles, makeDirs } = require("mrm-core");

  // Install Plop package
  installDevDependencies(devPackages);

  // Add Prettier Ignore file
  const prettierIgnoreFile = lines(".prettierignore");
  if (prettierIgnoreFile.exists()) {
    prettierIgnoreFile.remove(prettierIgnore).add(prettierIgnore).save();
  }

  // Base plopfile config
  copyFile(plopConfigSourcePath, plopConfigTargetPath);

  // Plop Command
  makeDirs(commandsRootPath);
  makeDirs(commandTargetPath);

  // Plop Command index.ts
  copyFile(commandIndexSourcePath, commandIndexTargetFilePath);

  // Plop Command plopCommandIndex.hbs
  copyFile(commandIndexHbsSourcePath, commandIndexHbsTargetFilePath);
  // deleteFiles("plops/plopCommand/ploCommandIndex.hbs");
  // const ploCommandIndexFile = lines("plops/plopCommand/plopCommandIndex.hbs");
  // ploCommandIndexFile.add(plopCommandIndexHbs).save();

  // Plop Command plopCommandHbs.hbs
  deleteFiles("plops/plopCommand/plopCommandHbs.hbs");
  const plopCommandHbsFile = lines("plops/plopCommand/plopCommandHbs.hbs");
  plopCommandHbsFile.add(plopCommandHbsContent).save();
};

module.exports.description = "Add plop package (code generator tool)";

const prettierIgnore = ["**/*.hbs"];

// const plopFileContent = `import { NodePlopAPI } from 'plop';

// import plopCommand from './plops/plopCommand';
// //--plop imports--

// export default function (plop: NodePlopAPI) {
//   plopCommand(plop);
//   //--plop commands--
// }
// `;

// const plopCommandIndexContent = `import { NodePlopAPI } from 'plop';

// export default function plopCommand(plop: NodePlopAPI) {
//   return plop.setGenerator('plopCommand', {
//     description: 'Create new plop command',
//     prompts: [
//       {
//         type: 'input',
//         name: 'command',
//         message: 'specify the plop command',
//       },
//     ],
//     actions: [
//       {
//         type: 'add',
//         path: './plops/{{camelCase command}}/index.ts',
//         templateFile: './plops/plopCommand/plopCommandIndex.hbs',
//       },
//       {
//         type: 'add',
//         path: './plops/{{camelCase command}}/{{camelCase command}}.hbs',
//         templateFile: './plops/plopCommand/plopCommandHbs.hbs',
//       },
//       {
//         path: 'plopfile.ts',
//         pattern: /(\\/\\/--plop imports--)/g,
//         template:
//           "import {{camelCase command}} from './plops/{{camelCase command}}';\\n$1",
//         type: 'modify',
//       },
//       {
//         path: 'plopfile.ts',
//         pattern: /(\\/\\/--plop commands--)/g,
//         template: '{{camelCase command}}(plop);\\n$1',
//         type: 'modify',
//       },
//     ],
//   });
// }
// `;

// const plopCommandIndexHbs = `import { NodePlopAPI } from 'plop';

// // This is a starter file.
// // Customize to your liking.

// export default function {{camelCase command}}(plop: NodePlopAPI) {
//   return plop.setGenerator('{{camelCase command}}', {
//     description: 'No description for {{camelCase command}}',
//     prompts: [
//       {
//         type: 'input',
//         name: 'targetFolder',
//         message: 'specify install folder',
//         default: 'src',
//       },
//     ],
//     actions: [
//       {
//         type: 'add',
//         path: '\\{\{targetFolder\}\}/{{camelCase command}}GeneratedFile.ts',
//         templateFile: './plops/{{camelCase command}}/{{camelCase command}}.hbs',
//       },
//     ],
//   });
// }
// `;

const plopCommandHbsContent = "// Put your generated file contents here";
