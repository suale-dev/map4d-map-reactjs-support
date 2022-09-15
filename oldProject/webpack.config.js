var config = {
  entry: './main.js',
  output: {
    filename: 'index.js'
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: "./",
    open: true,
    port: 7777,
    historyApiFallback: {
      disableDotRule: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ],
  }
}

module.exports = config;
