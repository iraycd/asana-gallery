import fs from 'fs';
import webpack from 'webpack';

import webpackCommon from './webpack.common';

import config from '../config';

const nodeModules = fs
  .readdirSync('node_modules')
  .filter((x) => x !== '.bin');

const BABEL = {
  presets: ['react', 'es2015', 'stage-0'],
  compact: true,
};

const BANNER_CODE = "require('source-map-support').install();";
const BANNER_OPTS = {
  raw: true,
  entryOnly: false
};

export default {
  target: 'node',
  entry: [
    config.dirs.appRoot,
  ],
  module: {
    loaders: [
      ...webpackCommon.BASE_LOADERS,
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: BABEL
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: config.dirs.server,
    libraryTarget: 'commonjs2',
  },
  modulesDirectories: ['node_modules'],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  externals: [
    nodeModules,
  ],
  devtool: 'source-map',
  plugins: [
    new webpack.BannerPlugin(BANNER_CODE, BANNER_OPTS),
  ],
};
