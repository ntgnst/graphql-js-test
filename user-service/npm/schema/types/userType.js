import { GraphQLObjectType } from 'graphql/type';
import { GraphQLString, GraphQLID } from 'graphql/type/scalars';
import { bookType } from './bookType';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    firstName: {
      type: GraphQLString,
    },
    book: {
      type: GraphQLID
    }
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
