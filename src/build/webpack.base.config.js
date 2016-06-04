import config from '../config';
import webpackCommon from './webpack.common';

var BABEL = {
  "presets": ["react", "es2015", "stage-0"],
  "env": {
    "development": {
      "presets": ["react", "es2015", "stage-0", "react-hmre"]
    }
  }
};


module.exports = {
  output: {
    filename: "[name].js",
    path: config.dirs.dist,
    publicPath: config.paths.jsPath
  },
  module: {
    loaders: [
      ...webpackCommon.BASE_LOADERS,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: BABEL
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
}
