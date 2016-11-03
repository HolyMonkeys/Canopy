module.exports = {
  entry: [
    './public/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/bundleSrc',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './'
  }
};
