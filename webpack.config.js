// const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");
const nodeExternals = require("webpack-node-externals");

const common = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["css-loader", "sass-loader"],
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
    ]
  },

    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
      "react-router-dom": path.resolve("./node_modules/react-router-dom"),
      "react-dom": "@hot-loader/react-dom",
      },
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      // new HtmlWebpackPlugin({
      //   template: "./public/index.html",
      //   filename: "./index.html",
      // }),
    ],
};

const clientConfig = {
  ...common,

  mode: "development",

  name: "client",
  target: "web",

  entry: {
    client: ["@babel/polyfill", "./src/client.js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: (module) => /node_modules/.test(module.resource),
          enforce: true,
        },
      },
    },
  },

  devtool: "cheap-module-source-map",

  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
};

const serverConfig = {
  ...common,

  mode: "development",

  name: "server",
  target: "node",
  externals: [nodeExternals()],

  entry: {
    server: ["@babel/polyfill", "./src/server.js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.js",
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: /src/,
        use: [
          'css-loader/locals', // It doesn't embed CSS but only exports the identifier mappings.
        ],
      },
    ],
  },

  devtool: "cheap-module-source-map",

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};

module.exports = [clientConfig, serverConfig];

// const path = require("path");
// const nodeExternals = require("webpack-node-externals");

// const common = {
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         loader: "babel-loader",
//         include: [path.resolve(__dirname, "src")],
//         query: {
//           presets: ["@babel/preset-env", "@babel/preset-react"],
//         },
//       },
//       {
//         test: /\.tsx?$/,
//         use: "ts-loader",
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.(png|svg|jpg|gif|ico)$/,
//         use: "file-loader",
//       },
//       {
//         test: /\.(woff|woff2|eot|ttf|otf)$/,
//         use: "file-loader",
//       },
//     ],
//   },

//   resolve: {
//     extensions: [".js", ".jsx", ".ts", ".tsx"],
//     alias: {
//       "react-router-dom": path.resolve("./node_modules/react-router-dom"),
//       "react-dom": "@hot-loader/react-dom",
//     },
//   },
// };

// const clientConfig = {
//   ...common,

//   mode: "development",
//   name: "client",
//   target: "web",

//   entry: {
//     client: ["@babel/polyfill", "./src/client.js"],
//   },
//   output: {
//     path: path.resolve(__dirname, "build"),
//     filename: "[name].js",
//   },

//   module: {
//     rules: [
//       {
//         test: /\.s[ac]ss$/i,
//         include: /src/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           {
//             loader: "css-loader",
//             options: {
//               modules: true,
//               localIdentName: "[name]-[hash:5]",
//             },
//           },
//           "sass-loader",
//         ],
//       },
//     ],
//   },

//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: "css/[name].css",
//     }),
//   ],

//   optimization: {
//     splitChunks: {
//       cacheGroups: {
//         vendor: {
//           chunks: "initial",
//           name: "vendor",
//           test: (module) => /node_modules/.test(module.resource),
//           enforce: true,
//         },
//       },
//     },
//   },
// };

// const serverConfig = {
//   ...common,

//   mode: "development",

//   name: "server",
//   target: "node",
//   externals: [nodeExternals()],

//   entry: {
//     server: ["@babel/polyfill", path.resolve(__dirname, "src", "server.js")],
//   },
//   output: {
//     path: path.resolve(__dirname, "build"),
//     filename: "server.js",
//   },

//   plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()],

//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         include: /src/,
//         use: [
//           {
//             loader: "css-loader/locals", // It doesn't embed CSS but only exports the identifier mappings.
//             options: {
//               modules: true,
//               localIdentName: "[name]-[hash:5]",
//             },
//           },
//         ],
//       },
//     ],
//   },

//   performance: {
//     hints: false,
//   },

//   optimization: {
//     minimizer: [new UglifyJSPlugin()],
//   },
// };

// module.exports = [clientConfig, serverConfig];
