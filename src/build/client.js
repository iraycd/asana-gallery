import ChildProcess from 'child_process';
import webpack from 'webpack';
import webpackConfig from './webpack.prod.config';

const STATS_OPTS = {
  colors: true,
  chunks: false,
}

function logStats (err, stats) {
  if (err) console.error(err);
  console.log(stats.toString(STATS_OPTS))
}

webpack(webpackConfig).run(logStats)
