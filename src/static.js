// import fs from 'fs';
import path from 'path';

import buildStatic from './lib/buildStatic';

import render from './app/render';
import Routes from './app/Routes';

// const postsPath = path.join(__dirname, './posts');
// const posts = (
//   fs.readdirSync(postsPath)
//     .map((filename) => path.parse(filename).name)
//     .map((name) => `posts/${name}`)
// )

const locations = [
  '/'
];

void buildStatic(
  path.join(__dirname, '../dist'),
  renderApp,
  Routes,
  locations,
);
