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
  target: "web",
  externals: {
    canvas: "canvas"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8000
          }
        }
      },
      {
        test: /\.html$/,
        exclude: /(node_modules|static)/,
        use: { loader: "html-loader" }
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
        from: path.join(__dirname, "../LICENSE"),
        to: path.join(__dirname, "../dist", pluginName)
      }
    ])
  ]
};
