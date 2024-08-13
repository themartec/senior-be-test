// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = 'style-loader';

const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin')

const nodeExternals = require('webpack-node-externals');

const config = {
  entry: {
    'main': './src/bin/www.ts',
    'create-jobs': './src/init-jobs.ts',
    'worker': './src/queue/worker.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/views',
          to: '../dist/views'
        },
        {
          from: './public',
          to: '../dist/public'
        }
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
  target: 'node',
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  externalsPresets: {
    node: true // in order to ignore built-in modules like path, fs, etc.
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
