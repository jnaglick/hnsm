import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export const WEB_CLIENT_DIST_PATH = path.resolve(__dirname, "./dist");

const config = {
  entry: "./src/index.tsx",

  output: {
    path: WEB_CLIENT_DIST_PATH,
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
