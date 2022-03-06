import * as path from 'path';
import NodemonPlugin from 'nodemon-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export const WEB_API_DIST_PATH = path.resolve(__dirname, "./dist");

const config = {
  output: {
    path: WEB_API_DIST_PATH,
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

export default config;