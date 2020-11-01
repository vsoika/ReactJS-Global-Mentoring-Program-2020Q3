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
  entry: "./src/index.jsx",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 7000,
    historyApiFallback: true,
    hot: true,
  },

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
      "react-router-dom": path.resolve("./node_modules/react-router-dom"),
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
};

if (isProd) {
  config.plugins.push(new UglifyJSPlugin());
}

module.exports = config;
