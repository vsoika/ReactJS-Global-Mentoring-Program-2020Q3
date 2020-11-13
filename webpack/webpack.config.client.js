const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.config");

const isDevMod = process.env.NODE_ENV === "development";

module.exports = merge(common, {
  name: "client",
  target: "web",

  entry: [
    isDevMod && "webpack-hot-middleware/client",
    "./src/index.jsx",
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    !isDevMod &&
      new CleanWebpackPlugin("./public", {
        root: path.resolve(__dirname, "../"),
      }),
    isDevMod && new webpack.HotModuleReplacementPlugin(),

    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ].filter(Boolean),
});
