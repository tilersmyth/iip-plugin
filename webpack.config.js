const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "to-string-loader" },
          { loader: "css-loader", options: { minimize: true } }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
    // new webpack.HotModuleReplacementPlugin(),
    //new ExtractTextPlugin("widget.css")
  ]
};
