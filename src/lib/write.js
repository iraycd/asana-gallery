import fs from 'fs';
import path from 'path';
import pify from 'pify';
import mkdirp from 'mkdirp';

const writeFileP = pify(fs.writeFile);
const mkdirpP = pify(mkdirp);

export default function write (filePath, text) {
  return mkdirpP(path.parse(filePath).dir)
    .then(() => writeFileP(filePath, text, 'utf8'))
}
