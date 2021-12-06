import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLID,
} from 'graphql';

const bookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
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
