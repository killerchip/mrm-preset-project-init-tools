module.exports = function plopCommand(plop) {
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
        path: "./plops/{{camelCase command}}/index.js",
        templateFile: "./plops/plopCommand/cmdIndex.hbs",
      },
      {
        type: "add",
        path: "./plops/{{camelCase command}}/{{camelCase command}}.hbs",
        templateFile: "./plops/plopCommand/cmdGenerated.hbs",
      },
      {
        path: "plopfile.js",
        pattern: /(\/\/--plop imports--)/g,
        template:
          "const {{camelCase command}} = require( './plops/{{camelCase command}}');\n$1",
        type: "modify",
      },
      {
        path: "plopfile.js",
        pattern: /(\/\/--plop commands--)/g,
        template: "{{camelCase command}}(plop);\n$1",
        type: "modify",
      },
    ],
  });
};
