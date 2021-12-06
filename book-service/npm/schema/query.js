import { GraphQLObjectType, GraphQLString } from 'graphql';
import { bookType } from './types';

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Queries',
  fields: {
    hello: {
      type: GraphQLString,
      description: 'Returns requested users with given args.',
    },
    getBook: {
      type: bookType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
    },
  },
});

export { query };