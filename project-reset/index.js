module.exports = function task({ projectName }) {
  const { json } = require("mrm-core");
  const file = json("package.json");
  file.set("name", projectName);
  file.set("repository", "");
  file.set("author", "");
  file.set("description", "");
  file.set("version", "0.0.1");
  file.save();
};

module.exports.parameters = {
  projectName: {
    // input, number, confirm, list, rawlist, expand, checkbox, password, editor
    type: "input",
    message: "New name for the project",
  },
};

module.exports.description = "Customize project package.json name";
