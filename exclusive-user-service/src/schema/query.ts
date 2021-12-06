import { GraphQLString } from 'graphql';
import { createQuery } from '../helper';
import { userType } from './types';

const query = createQuery({
  name: 'Query',
  description: 'Queries',
  fields: {
    hello: {
      type: GraphQLString,
      description: 'Returns requested users with given args.',
    },
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
