import express from 'express';

import config from './config';
import graphqlHandler from './handlers/graphql';
import contentHandler from './handlers/content';
import healthHandler from './handlers/health';

export default function start () {
  return express()
    .use(config.paths.jsPath, express.static(config.dirs.client))
    .use(config.paths.cssPath, express.static('./public/css'))
    .use('/favicon.ico', express.static('./public/favicon.ico'))
    .use('/graphql', graphqlHandler)
    .use(contentHandler);
}
