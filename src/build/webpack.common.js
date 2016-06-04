import path from 'path';
import webpack from 'webpack';
import config from '../config';

const {
  optimize: {
    UglifyJsPlugin,
    OccurenceOrderPlugin,
  },
  HotModuleReplacementPlugin,
  NoErrorsPlugin,
  DefinePlugin,
} = webpack;

const dev = process.env.NODE_ENV === 'development';

const BASE_LOADERS = [
  {
    test: /\.css/,
    loaders: [
      'isomorphic-style-loader',
      `css-loader?${JSON.stringify({
        sourceMap: dev,
        modules: true,
        localIdentName: dev ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
        minimize: !dev,
      })}`,
      'postcss-loader',
    ],
  },
  {
    test: /\.ts$/,
    loader: 'ts-loader'
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
];

const DEV_PLUGINS = [
  new HotModuleReplacementPlugin(),
];

const PROD_PLUGINS = [
  new UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
];

const PLUGINS = [
  new OccurenceOrderPlugin(),
  new NoErrorsPlugin(),
  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

const DEV_MIDDLEWARE = [
  "webpack-dev-server/client?http://localhost:8889/",
  "webpack/hot/dev-server",
];

const ENTRY =  {
  // crazy!  look BACK in src!
  client: path.join(config.dirs.appRoot, './../src/client.js'),
};

export default {
  BASE_LOADERS,
  DEV_PLUGINS,
  PROD_PLUGINS,
  PLUGINS,
  DEV_MIDDLEWARE,
  ENTRY,
};
