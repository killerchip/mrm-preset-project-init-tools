module.exports = function task() {
  const { lines, install, deleteFiles, makeDirs } = require("mrm-core");

  // Install Plop package
  install(devDependenciesToInstall, { yarn: true });

  // Add Prettier Ignore file
  const prettierIgnoreFile = lines(".prettierignore");
  if (prettierIgnoreFile.exists()) {
    prettierIgnoreFile.remove(prettierIgnore).add(prettierIgnore).save();
  }

  // Base plopfile config
  deleteFiles("plopfile.ts");
  const plopFile = lines("plopfile.ts");
  plopFile.add(plopFileContent).save();

  // Plop Command
  makeDirs("plops");
  makeDirs("plops/plopCommand");

  // Plop Command index.ts
  deleteFiles("plops/plopCommand/index.ts");
  const plopInstallIndexFile = lines("plops/plopCommand/index.ts");
  plopInstallIndexFile.add(plopCommandIndexContent).save();

  // Plop Command plopCommandIndex.hbs
  deleteFiles("plops/plopCommand/ploCommandIndex.hbs");
  const ploCommandIndexFile = lines("plops/plopCommand/plopCommandIndex.hbs");
  ploCommandIndexFile.add(plopCommandIndexHbs).save();

  // Plop Command plopCommandHbs.hbs
  deleteFiles("plops/plopCommand/plopCommandHbs.hbs");
  const plopCommandHbsFile = lines("plops/plopCommand/plopCommandHbs.hbs");
  plopCommandHbsFile.add(plopCommandHbsContent).save();
};

module.exports.description = "Add plop package (code generator tool)";

const devDependenciesToInstall = ["plop"];
const prettierIgnore = ["**/*.hbs"];
const plopFileContent = `import { NodePlopAPI } from 'plop';

import plopCommand from './plops/plopCommand';
//--plop imports--

export default function (plop: NodePlopAPI) {
  plopCommand(plop);
  //--plop commands--
}
`;

const plopCommandIndexContent = `import { NodePlopAPI } from 'plop';

export default function plopCommand(plop: NodePlopAPI) {
  return plop.setGenerator('plopCommand', {
    description: 'Create new plop command',
    prompts: [
      {
        type: 'input',
        name: 'command',
        message: 'specify the plop command',
      },
      {
        type: 'input',
        name: 'targetFolder',
        message: 'specify install folder',
        default: 'plops',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{targetFolder}}/{{camelCase command}}/index.ts',
        templateFile: './plops/plopCommand/plopCommandIndex.hbs',
      },
      {
        type: 'add',
        path: '{{targetFolder}}/{{camelCase command}}/{{camelCase command}}.hbs',
        templateFile: './plops/plopCommand/plopCommandHbs.hbs',
      },
      {
        path: 'plopfile.ts',
        pattern: /(\\/\\/--plop imports--)/g,
        template:
          "import {{camelCase command}} from './plops/{{camelCase command}}';\\n$1",
        type: 'modify',
      },
      {
        path: 'plopfile.ts',
        pattern: /(\\/\\/--plop commands--)/g,
        template: '{{camelCase command}}(plop);\\n$1',
        type: 'modify',
      },
    ],
  });
}
`;

const plopCommandIndexHbs = `import { NodePlopAPI } from 'plop';

export default function inversify(plop: NodePlopAPI) {
  return plop.setGenerator('{{camelCase command}}', {
    description: 'No description for {{camelCase command}}',
    prompts: [
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
        path: '\\{\{targetFolder\}\}/{{camelCase command}}GeneratedFile.ts',
        templateFile: './plops/{{camelCase command}}/{{camelCase command}}.hbs',
      },
    ],
  });
}
`;

const plopCommandHbsContent = `// Put your generated file contents here
`