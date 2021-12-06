import { GraphQLList, GraphQLObjectType } from 'graphql/type';
import { GraphQLString } from 'graphql/type/scalars';
import { bookType } from './bookType';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    firstName: {
      type: GraphQLString,
    },
    books: {
      type: new GraphQLList(bookType),
    },
  }),
});

// builder.addType({
//   name: '',
//   description: '',
//   fields: {
//     userName: {
//       type:
//     }
//   },
//  directives: []
// })

export { userType };
