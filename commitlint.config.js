/** @type {import('@commitlint/types').UserConfig} */
const CommitLintConfiguration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // add your own scope here if needed
    
      "@typescript-eslint/no-unused-vars": "off",
  
  },
};

module.exports = CommitLintConfiguration;
