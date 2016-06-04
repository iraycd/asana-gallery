// Please don't modify this file
// unless you're adding a loader
// or modifying environment config

import 'babel-polyfill';
import config from './config';
import http from 'http';

let start = require('./server').default;

const VALID_MODES = [
  'development',
  'production',
];

const {NODE_ENV} = process.env;

if (!VALID_MODES.includes(NODE_ENV)) {
  throw new Error(`Nonstandard process.env.NODE_ENV: ${NODE_ENV}`);
}

const state = {};

const onReady = () => {
  console.log(`Ready on port ${config.defaultDevPort}.`);
  process.send && process.send('ready');
}

console.log(`Starting app server in ${config.dev ? 'dev' : 'prod'} mode.`);

const server = http.createServer(start())
  .listen(config.defaultDevPort, onReady);

// if (config.dev) {
//   const repl = require('repl');
//   console.log('Starting REPL: ');
//   const r = repl.start('∆ ');
//   r.context.server = server;
//   r.context.state = state;
// }
