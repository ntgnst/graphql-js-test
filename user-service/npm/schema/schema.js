import { GraphQLSchema } from 'graphql';
import { query } from './query';
import { userType, bookType } from './types';

const schema = new GraphQLSchema({
  query,
  // Note: If an array of `directives` are provided to GraphQLSchema, that will be
  // the exact list of directives represented and allowed. If `directives` is not
  // provided then a default set of the specified directives (e.g. `@include` and
  // `@skip`) will be used. If you wish to provide *additional* directives to these
  // specified directives, you must explicitly declare them. Example:
  // directives: useDirectives([toUpperCase]),
  // assumeValid: assumeValidSchema()
  types: [userType],

});

export { schema };
