module.exports = {
  testPathIgnorePatterns: ["node_modules", "dist", "cdk.out"],
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
