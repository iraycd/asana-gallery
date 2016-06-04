import ChildProcess from 'child_process';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from '../config';
import webpackServerConfig from './webpack.server.config';
import webpackClientConfig from './webpack.dev.config';

const STATS_OPTS = {
  colors: true,
  chunks: false,
};

const WEBPACK_DEV_SERVER_OPTS = {
  publicPath: webpackClientConfig.output.publicPath,
  hot: true,
  stats: STATS_OPTS,
  proxy: {
    '*': 'http://0.0.0.0:8888'
  }
};

let serv;
let frontendReady = false;
let backendReady = false;
let browserOpened = false;

function maybeOpenBrowser () {
  if (frontendReady && backendReady && !browserOpened) {
    browserOpened = true;
    ChildProcess.spawn('open', ['http://0.0.0.0:8889']);
  }
}

function logStats (err, stats) {
  if (err) console.error(err);
  console.log(stats.toString(STATS_OPTS))
}

function restart () {
  serv = ChildProcess.fork(webpackServerConfig.output.path);
}

function onBuild (err, stats) {
  logStats(err, stats);
  if (!err) {
    if (!serv) {
      serv = ChildProcess.fork(
        webpackServerConfig.output.path,
        null,
        {
          env: {
            NODE_ENV: process.env.NODE_ENV
          }
        }
      );
      serv.on('message', (msg) => {
        if (msg === 'ready') {
          backendReady = true;
          maybeOpenBrowser();
        }
      })
    } else {
      serv.kill();
      serv.on('exit', restart);
      serv.on('error', restart);
    }
  }
}

const backend = webpack(webpackServerConfig)
  .watch(
    {},
    onBuild
  );

const compiler = webpack(webpackClientConfig);
compiler.plugin('done', () => {
  frontendReady = true;
  maybeOpenBrowser();
});
const frontend = new WebpackDevServer(
  compiler,
  WEBPACK_DEV_SERVER_OPTS
);

frontend.listen(8889);
