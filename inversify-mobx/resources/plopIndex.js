module.exports = function plopCommand(plop) {
  return plop.setGenerator("addStore", {
    description: "Creates a new Class Store that can be served by inversify",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Store name",
      },
      {
        type: "input",
        name: "targetFolder",
        message: "specify install folder",
        default: "src",
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{targetFolder}}/{{pascalCase name}}.ts",
        templateFile: "./plops/addStore/store.ts.hbs",
      },
    ],
  });
};
