import graphqlHTTP from 'express-graphql';
import config from '../config';
import db from '../app/services/db';
import Schema from '../app/data/Schema';

export default graphqlHTTP(
  (request) => ({
    schema: Schema,
    pretty: config.dev,
    graphiql: config.dev,
    context: {
      request,
      db: db(),
    },
  })
);
