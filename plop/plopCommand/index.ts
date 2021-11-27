import { NodePlopAPI } from "plop";

export default function plopCommand(plop: NodePlopAPI) {
  return plop.setGenerator("plopCommand", {
    description: "Create new plop command",
    prompts: [
      {
        type: "input",
        name: "command",
        message: "specify the plop command",
      },
    ],
    actions: [
      {
        type: "add",
        path: "./plops/{{camelCase command}}/index.ts",
        templateFile: "./plops/plopCommand/cmdIndex.hbs",
      },
      {
        type: "add",
        path: "./plops/{{camelCase command}}/{{camelCase command}}.hbs",
        templateFile: "./plops/plopCommand/plopCommandHbs.hbs",
      },
      {
        path: "plopfile.ts",
        pattern: /(\/\/--plop imports--)/g,
        template:
          "import {{camelCase command}} from './plops/{{camelCase command}}';\n$1",
        type: "modify",
      },
      {
        path: "plopfile.ts",
        pattern: /(\/\/--plop commands--)/g,
        template: "{{camelCase command}}(plop);\n$1",
        type: "modify",
      },
    ],
  });
}
