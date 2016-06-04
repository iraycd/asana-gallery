import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt
} from 'graphql';

import {
  resolveUser,
} from './resolvers';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLInt
    },
    username: {
      type: GraphQLString
    },
  }
});

const rootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: resolveUser
    }
  }
});

const Schema = new GraphQLSchema({
  query: rootQueryType
});

export default Schema;
