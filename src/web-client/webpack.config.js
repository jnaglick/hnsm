const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const config = {
  entry: "./src/index.tsx",

  output: {
    path: path.resolve("./dist"),
    filename: "bundle.js",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    plugins: [new TsconfigPathsPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "",
      filename: "index.html",
      template: "./src/index.html",
      chunks: [],
    }),
  ],

  target: "web",

  watchOptions: {
    ignored: /node_modules/,
  },

  devtool: "inline-source-map",

  devServer: {
    liveReload: true,
    port: 9000,
    client: {
      overlay: false,
    },
  },
};

module.exports = config;
