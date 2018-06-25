const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const pluginName = "tinymce-image-map";

module.exports = {
  mode: "production",
  entry: {
    plugin: "./src/index.js",
    "plugin.min": "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "../dist", pluginName),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/
      })
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "../src/LICENSE"),
        to: path.join(__dirname, "../dist", pluginName)
      }
    ])
  ]
};
