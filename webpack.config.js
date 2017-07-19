
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    publicPath: '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$|\.jsx$/,
        exclude: /node_modules|public/,
        use: {
          loader: 'babel-loader', 
          options: {
              presets: ['es2015','react','stage-3']
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|)$/,
        use: [ 'file-loader?name=images/[name].[ext]' ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: ['file-loader?name=fonts/[name].[ext]'],
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public'
  }
}