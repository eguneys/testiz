var path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'src') + '/boot.js'
  ],
  devServer: {
    hot: true,
    inline: true,
    host: '0.0.0.0',
    disableHostCheck: true
  },
  output: {
    filename: 'bundle.js',
    libraryTarget: 'var',
    library: 'City',
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: path.resolve(__dirname, './node_modules/')
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'head'
    }),
    new webpack.HotModuleReplacementPlugin({})
  ]
};

const prodConfig = {
  ...devConfig,
//  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist') + '/app',
    filename: 'bundle.js',
    libraryTarget: 'umd'
  }
};

module.exports = (env) => {
  switch (env) {
  case 'production':
    return [devConfig, prodConfig];
  default:
    return devConfig;
  }
};
