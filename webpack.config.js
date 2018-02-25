const path = require("path")

module.exports = {
  entry: "./src/iFullscreen.js",
  output: {
    filename: "iFullscreen.min.js",
    path: path.resolve(__dirname, "dist"),
    library: "iFullscreen"
  },
  devServer: {
    contentBase: __dirname
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|browser_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
}
