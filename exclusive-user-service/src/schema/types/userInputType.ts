import { GraphQLList } from 'graphql/type';
import { createInputType } from '../../helper';
import { bookInputType } from './bookInputType';

const userInputType = createInputType({
  name: 'UserInput',
  description: 'Input payload for creating user',
  fields: () => ({
    books: {
      type: new GraphQLList(bookInputType),
      description: 'Input Books',
      defaultValue: new GraphQLList(bookInputType),
    },
  }),
});

export { userInputType };
