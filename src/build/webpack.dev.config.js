import {mapValues} from 'lodash';
import webpackCommon from './webpack.common';
import webpackBaseConfig from './webpack.base.config';

const entry = mapValues(
  webpackCommon.ENTRY,
  (e) => [...webpackCommon.DEV_MIDDLEWARE, e]
);

export default {
  ...webpackBaseConfig,
  entry,
  debug: true,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...webpackCommon.PLUGINS,
    ...webpackCommon.DEV_PLUGINS
  ]
};
