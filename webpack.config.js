const path = require('path');
const webpack = require('webpack');
require('dotenv').config();


const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ENV = process.env.APP_ENV;
const isDev = ENV === 'dev';
const isProd = ENV === 'build';

function setDevTool() {
  if (isDev) {
    return 'eval-source-map';
  } else {
    return 'source-map';
  }
}

function setDMode() {
  if (isProd) {
    return 'production';
  } else {
    return 'development';
  }
}


module.exports = {
  mode: setDMode(),
  devtool: setDevTool(),
  watch: true,
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    port: 7000,
  },
  

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify(process.env.API_KEY),
      APP_ENV: JSON.stringify(process.env.APP_ENV),
    }),
  ],
};

if (isProd) {
  config.plugins.push(
    new UglifyJSPlugin(),
    new CopyWebpackPlugin([{
        from: __dirname + '/public'
    }])
  );
}
