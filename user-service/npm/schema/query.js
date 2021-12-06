import { GraphQLString, GraphQLObjectType } from 'graphql';
import { userType } from './types';

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Queries',
  fields: {
    getUser: {
      type: userType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
    },
  },
});

export { query };