import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
} from 'graphql';
import { createType } from '../../helper';

const bookType = createType({
  name: 'Book',
  description: 'Book Type Definition',
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

export { bookType };
