module.exports = function task() {
  const { json } = require("mrm-core");
  const { install } = require("mrm-core");

  install("eslint-config-universe", { yarn: true });

  const eslintrc = json(".eslintrc.json");

  if (!eslintrc.exists()) {
    throw new Error(".eslintrc.json was not found");
  }
  eslintrc.merge({
    extends: "universe",
  });

  eslintrc.save();
  console.log("Configuration done");
};

module.exports.description =
  "Add pre-configured eslint, prettier, pre-commit for expo apps";
