var path = require('path');

module.exports = {
  entry: [
    './public/index.jsx'
  ],
  output: {
    path: path.join(__dirname, '/publicServed'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.jsx$/,
      exclude: /(node_modules)/,
      loader: 'babel', // 'babel-loader' is also a valid name to reference
      query: {
        presets: ['react', 'es2015'] //can add "es2015" to compile to es5
      }
    }
    // ,
    // {
    //   test: /\.js$/,
    //   exclude: /node_modules/,
    //   loader: 'eslint-loader'
    // }]
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './'
  }
};
