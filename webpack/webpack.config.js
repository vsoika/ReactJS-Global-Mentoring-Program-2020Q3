const path = require("path");
const webpack = require("webpack");
require("dotenv").config();

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const ENV = process.env.NODE_ENV;
const isDev = ENV === "development";
const isProd = ENV === "production";

function setDevTool() {
  if (isDev) {
    return "eval-source-map";
  } else {
    return "source-map";
  }
}

function setDMode() {
  if (isProd) {
    return "production";
  } else {
    return "development";
  }
}

const config = {
  mode: setDMode(),
  devtool: setDevTool(),
  watch: true,

  output: {
    filename: "js/[name].js",
    path: path.resolve("./public"),
  },

  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: "file-loader",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: "file-loader",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      // "react-router-dom": path.resolve("./node_modules/react-router-dom"),
      // "react-dom": "@hot-loader/react-dom",
    },
  },
};

if (isProd) {
  config.plugins.push(new UglifyJSPlugin());
}

module.exports = config;
