var path = require('path');

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  defaultDevPort: 8888,
  dirs: {
    appRoot: path.join(__dirname, '.'),
    server: path.join(__dirname, '../dist'),
    client: path.join(__dirname, '../dist/js'),
    dist: path.join(__dirname, '../dist/js')
  },
  paths: {
    jsPath: '/js/',
    cssPath: '/css/'
  }
};
