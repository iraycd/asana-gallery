import webpackCommon from './webpack.common';
import webpackBaseConfig from './webpack.base.config';
import config from '../config';

export default {
  ...webpackBaseConfig,
  devtool: 'source-map',
  entry: webpackCommon.ENTRY,
  plugins: [
    ...webpackCommon.PLUGINS,
    ...webpackCommon.PROD_PLUGINS,
  ]
};
