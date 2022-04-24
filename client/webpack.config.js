const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const mode = process.env.NODE_ENV;

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './index.html',
    inject: 'body',
    hash: false,
  }),
];

if (mode === 'development') {
  plugins.push(new ReactRefreshWebpackPlugin());
}

const config = {
  mode: mode === 'production' ? 'production' : 'development',

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  context: path.resolve(__dirname, 'src'),

  entry: './index.jsx',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === 'production' ? 'asset' : 'asset/resource',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins,

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 8888,
    hot: true,
  },
};

module.exports = config;
