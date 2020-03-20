
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    // 'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './public/index.jsx',
    './public/stylesheets/main.scss'
  ],
  output: {
    path: path.resolve(__dirname, 'publicServed/'),
    publicPath: 'http://localhost:3000/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: /(node_modules)/,
      loader: 'babel', // 'babel-loader' is also a valid name to reference
      query: {
        presets: ['react', 'es2015'] // can add "es2015" to compile to es5
      }
    },
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel', // 'babel-loader' is also a valid name to reference
      query: {
        presets: ['es2015'] // can add "es2015" to compile to es5
      }
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }
    ]

  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      "bootstrap-sass$": "bootstrap-sass/assets/stylesheets/bootstrap"
    }
  }
};
