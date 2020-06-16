const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    contentBase: './dist',
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader', // compiles Less to CSS
      },
      {
        test: /\.sass$/,
        loader: 'sass-loader', // compiles Less to CSS
      },
    ],

  },
  plugins: [
  ],
};
