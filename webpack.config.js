var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./app.js",
  output: {
    publicPath:'./public/',
    path: './public/',
    filename: "build.js"
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ],
 module: {
  loaders: [{    
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  }
}

var devFlagPlugin = new webpack.DefinePlugin({  
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});