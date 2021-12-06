import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
} from 'graphql';
import { createInputType } from '../../helper';

const bookInputType = createInputType({
  name: 'BookInput',
  description: 'Book Input Type Definition',
  fields: () => ({
    pageCount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    price: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  }),
});

export { bookInputType };
