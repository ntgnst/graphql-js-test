import { Maybe } from '@graphql-tools/utils/types';
import { extendSchema } from 'graphql';
import { createSchema } from '../helper';
import { query } from './query';
import { bookInputType, bookType, userInputType } from './types';
import { userType } from './types/userType';

const useSchemaDescription = (desc = 'Schema'): Maybe<string> => desc;
const assumeValidSchema = (assumeValid = false): boolean => assumeValid;

const schema = createSchema({
  query,
  description: useSchemaDescription(),
  // Note: If an array of `directives` are provided to GraphQLSchema, that will be
  // the exact list of directives represented and allowed. If `directives` is not
  // provided then a default set of the specified directives (e.g. `@include` and
  // `@skip`) will be used. If you wish to provide *additional* directives to these
  // specified directives, you must explicitly declare them. Example:
  // directives: useDirectives([toUpperCase]),
  // assumeValid: assumeValidSchema()
  types: [userType, bookType, userInputType, bookInputType],
});

// applyCustomDirectives(schema);

export { schema };
