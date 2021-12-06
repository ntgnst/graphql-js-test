import {
  GraphQLDirective,
  GraphQLInputObjectType,
  GraphQLInputObjectTypeConfig,
  GraphQLObjectType,
  GraphQLObjectTypeConfig,
  GraphQLSchema,
  GraphQLSchemaConfig,
  specifiedDirectives,
} from 'graphql';
import { createDirective } from './useCustomDirectives';

type MutationPayloadType = GraphQLObjectType<any, any>;
/**
 * @type {Function}
 * @param {object} config - InputType definition object.
 * @returns - GraphQLObjectType.
 * ---
 * Example usage:
 * ---
 * Same as `createType(...)` but it using for inputs.
 * ```
 * const userInputType = createInputType({
 * name: 'User',
 *   description: 'User Type Definition',
 *   fields: () => ({
 *     username: { type: new GraphQLNonNull(GraphQLString), },
 *     email: { type: GraphQLString, },
 *     phone: { type: GraphQLString, },
 *     firstName: { type: GraphQLString, },
 *     lastName: { type: GraphQLString, },
 *     ...
 *   }),
 *   ...
 * });
 *```
 */
export const createInputType = (
  config: Readonly<GraphQLInputObjectTypeConfig>,
): GraphQLInputObjectType => {
  return new GraphQLInputObjectType(config);
};

/**
 * @type {Function}
 * @param {object} typeDefinition - Type definition object.
 * @returns - GraphQLObjectType.
 * ---
 * Example usage:
 * ---
 * ```
 * const userType = createType({
 * name: 'User',
 *   description: 'User Type Definition',
 *   fields: (): any => ({
 *     username: { type: new GraphQLNonNull(GraphQLString), },
 *     email: { type: GraphQLString, },
 *     phone: { type: GraphQLString, },
 *     firstName: { type: GraphQLString, },
 *     lastName: { type: GraphQLString, },
 *     createdAt: { type: GraphQLString, },
 *     updatedAt: { type: GraphQLString, },
 *     ...
 *   }),
 *   ...
 * });
 *```
 */
export const createType = (
  typeDef: Readonly<GraphQLObjectTypeConfig<any, any>>,
): GraphQLObjectType => {
  return new GraphQLObjectType(typeDef);
};

/**
 * @type {Function}
 * @param {string} name - string.
 * @param {GraphQLObjectType} type - GraphQLObjectType.
 * @param {Function} resolve - Resolve function.
 * @param {Object} args - Arguments.
 * @returns -  Mutation object.
 * ---
 * Example usage:
 * ---
 * Input Type definition :
 ** It using as mutation input type definition.
 * ```
 * const userInputType = createInputType({
 *  name: 'UserInput',
 *  description: 'Input payload for creating user',
 *  fields: () => ({...}),
 * });
 *```
 *---
 * Payload definition :
 ** It using as mutation's return value definition.
 * ```
 * const userMutationPayload = createType({
 *  name: 'UserMutationPayload',
 *  description: 'User type definition for creating new user',
 *  fields: () => ({ user: { type: new GraphQLNonNull(userType) } }),
 * });
 *```
 * ---
 * Mutation Definition:
 ** It uses `payload` and `input type` definitions. (`userInputType` and `userMutationPayload`)
 * ```
 * const createUser = createMutation(
 *  'createUser',
 *   userMutationPayload,
 *   (parent, { input }) => { return { user: createdUsers };}, // Returned object : `{ user: createdUsers }` have to be same as `userMutationPayload`
 *    { input: { type: new GraphQLNonNull(userInputType) }},
 * );
 *```
 */
export const createMutation = (
  name: string,
  type: GraphQLObjectType | GraphQLInputObjectType,
  resolve: (
    parent?: any,
    args?: any,
    context?: any,
    info?: any,
  ) => MutationPayloadType | unknown,
  args?: {},
): any => {
  return {
    [name]: {
      type,
      args,
      resolve,
    },
  };
};

/**
 * @type {Function}
 * @param {object} schemaConfig - Schema definition object.
 * @returns - GraphQLSchema.
 * ---
 * Example usage:
 * ---
 * ```
 * const schema = createSchema({
 * query,
 * mutation,
 * description: useSchemaDescription(), // see useSchemaDescription(description = 'Schema')
 * directives: useDirectives([toUpperCase]), // see useDirectives([customDirective])
 * assumeValid: assumeValidSchema(), // see assumeValidSchema(true | false)
 *...
 * });
 *```
 */
export const createSchema = (
  schemaConfig: Readonly<GraphQLSchemaConfig>,
): GraphQLSchema => {
  return new GraphQLSchema(schemaConfig);
};

/**
 * @type {Function}
 * @param {object} queryConfig - Query definition object.
 * @returns - GraphQLQuery.
 * ---
 * Example usage:
 * ---
 * Creating `userQueries` object.
 * ```
 * const userQueries = {
 *   users: { type: new GraphQLList(userType), description: '...', resolve: () => { ... } },
 * };
 *```
 * ---
 * Creating `query` object
 * ```
 * const query = createQuery({
 * name: 'Query',
 * description: 'Queries',
 * fields: userQueries, // Contains query fields in object.
 * });
 *```
 */
export const createQuery = (
  queryConfig: Readonly<GraphQLObjectTypeConfig<any, any>>,
): GraphQLObjectType<any, any> => {
  return new GraphQLObjectType(queryConfig);
};

/**
 * @type {Function}
 * @param - An array that contains custom directive definitions.
 * @returns - Concatenate given directives with default GraphQLDirectives[].
 * ---
 * Example usage:
 * ---
 * Creating directive:
 * ```js
 * const toUpperCase = createCustomDirective({...});
 * ```
 * ---
 * Using in schema:
 * ```js
 * const schema = createSchema({
 * ...
 * directives: useDirectives([toUpperCase]),
 *...
 * });
 *```
 */
export const useDirectives = (
  directives: Array<GraphQLDirective>,
): GraphQLDirective[] => {
  return specifiedDirectives.concat(directives);
};

/**
 * @type {Function}
 * @param config - DirectiveConfig.
 * @returns - GraphQLDirective
 * ---
 * Example usage:
 * ---
 * Creating directive:
 * ```js
 * const toUpperCase = createCustomDirective({
 *  name: 'directive name',
 *  description: '..',
 *  locations: [DirectiveLocation.FIELD],
 *  args: { caseName: GraphQLString, description: 'arg description'},
 *  resolve: async ( resolve, returnedValue, args, ) => {
 *   //Directive Logic
 *   const result = await resolve();
 *   return result.toUpperCase();
 *  },
 * });
 * ```
 */
export const createCustomDirective = (config: any) => createDirective(config);
