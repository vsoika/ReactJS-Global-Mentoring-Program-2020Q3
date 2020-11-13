const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const common = require("./webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  name: "server",
  target: "node",
  entry: "./src/serverRenderer.js",
  externals: [nodeExternals()],
  output: {
    filename: "js/serverRenderer.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },

      {
        test: /\.s[ac]ss$/i,
        include: /src/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",

          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
});
