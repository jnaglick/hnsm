const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const clientConfig = {
  output: {
    path: path.resolve("./dist"),
    filename: "bundle.js",
    libraryTarget: "commonjs",
  },

  resolve: {
    extensions: [".ts", ".js"],
    modules: [
      path.resolve("./node_modules"),
      path.resolve("./src"),
      path.resolve("../common/node_modules"),
    ],
    plugins: [new TsconfigPathsPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [new NodemonPlugin()],

  target: "node",

  watchOptions: {
    ignored: /node_modules/,
  },
};

module.exports = clientConfig;
