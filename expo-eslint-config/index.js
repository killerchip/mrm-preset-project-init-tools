module.exports = function task() {
  const { json } = require("mrm-core");
  const eslintrc = json(".eslintrc.json");

  if (!eslintrc.exists()) {
    throw new Error(".eslintrc.json was not found");
  }
  eslintrc.merge({
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  });

  eslintrc.save();
  console.log("now will configure");
};

module.exports.description =
  "Add pre-configured eslint, prettier, pre-commit for expo apps";
