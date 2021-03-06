const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    plugin: "./src/index.js"
  },
  devServer: {
    hot: true
  },
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
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["plugin"],
      inject: true,
      filename: "index.html",
      template: "./static/index.html"
    })
  ]
};
