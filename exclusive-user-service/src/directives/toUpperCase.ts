import { DirectiveLocation } from 'graphql/language/directiveLocation';
import { GraphQLInt } from 'graphql/type/scalars';
import { createCustomDirective } from '../helper';

const toUpperCase = createCustomDirective({
  name: 'toUpperCase',
  description: 'change the case of a string to uppercase',
  locations: [DirectiveLocation.FIELD],
  args: {
    multiply: { type: GraphQLInt, description: 'test directive arg' },
  },
  resolve: async (
    resolve: () => Promise<string>,
    resolvedValue: any,
    { multiply }: any,
  ) => {
    const result = await resolve();
    return result !== null ? result.toUpperCase() : result;
  },
});

export { toUpperCase };
