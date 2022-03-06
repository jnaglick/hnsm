const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.base.json');

module.exports = {
  testPathIgnorePatterns: ["node_modules", "dist", "cdk.out"],
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: __dirname,
  }),
};
