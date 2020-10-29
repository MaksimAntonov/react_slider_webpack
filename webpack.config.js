const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`);

const jsLoaders = () => {
  const loaders = ['babel-loader'];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

const optimization = () => {
  const config = {};

  if (isProd) {
    config.minimizer = [
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: filename('js'),
  },
  performance: {
    hints: false,
  },
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: jsLoaders(),
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 4200,
    hot: true,
    open: true,
  },
};
