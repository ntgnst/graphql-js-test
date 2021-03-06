import { GraphQLDirective } from 'graphql/type/directives';
import { GraphQLSchema, parse } from 'graphql';

const DEFAULT_DIRECTIVES = ['skip', 'include'];

/**
 * If a resolve function is not given, then a default resolve behavior is used
 * which takes the property of the source object of the same name as the field
 * and returns it as the result, or if it's a function, returns the result
 * of calling that function.
 */
const defaultResolveFn = (source, args, context, info) => {
  const fieldName = info.fieldName;
  // ensure source is a value for which property access is acceptable.
  if (typeof source === 'object' || typeof source === 'function') {
    return typeof source[fieldName] === 'function'
      ? source[fieldName]()
      : source[fieldName];
  }
};

/**
 * resolving field using directive resolver
 */
const resolveWithDirective = (resolve, source, directive, context, info) => {
  source =
    source ||
    ((info || {}).variableValues || {}).input_0 ||
    ((info || {}).variableValues || {}).input ||
    {};
  const directiveConfig = info.schema._directives.filter(
    d => directive.name.value === d.name,
  )[0];

  const args = {};

  for (const arg of directive.arguments) {
    args[arg.name.value] = arg.value.value;
  }

  return directiveConfig.resolve(resolve, source, args, context, info);
};

/**
 * parse directives from a schema defenition form them as graphql directive structure
 */
const parseSchemaDirectives = directives => {
  const schemaDirectives = [];

  if (
    !directives ||
    !(directives instanceof Object) ||
    Object.keys(directives).length === 0
  ) {
    return [];
  }

  for (const directiveName in directives) {
    const argsList = [];
    let args = '';

    Object.keys(directives[directiveName]).map(key => {
      argsList.push(`${key}:"${directives[directiveName][key]}"`);
    });

    if (argsList.length > 0) {
      args = `(${argsList.join(',')})`;
    }

    schemaDirectives.push(`@${directiveName}${args}`);
  }

  return parse(`{ a: String ${schemaDirectives.join(' ')} }`).definitions[0]
    .selectionSet.selections[0].directives;
};

/**
 * If the directive is defined on a field it will execute the custom directive
 * resolve right after executing the resolve of the field otherwise it will execute
 * the original resolve of the field
 */
const resolveMiddlewareWrapper = (
  resolve = defaultResolveFn,
  directives = {},
) => {
  const serverDirectives = parseSchemaDirectives(directives);

  return (source, args, context, info) => {
    const directives = serverDirectives.concat(
      (info.fieldASTs || info.fieldNodes)[0].directives,
    );
    const directive = directives.filter(
      d => DEFAULT_DIRECTIVES.indexOf(d.name.value) === -1,
    )[0];

    if (!directive) {
      return resolve(source, args, context, info);
    }

    let defer = resolveWithDirective(
      // eslint-disable-next-line no-undef
      () => Promise.resolve(resolve(source, args, context, info)),
      source,
      directive,
      context,
      info,
    );
    defer.catch(e =>
      resolveWithDirective(
        /* istanbul ignore next */
        // eslint-disable-next-line no-undef
        () => Promise.reject(e),
        source,
        directive,
        context,
        info,
      ),
    );

    if (directives.length <= 1) {
      return defer;
    }

    for (const directiveNext of directives.slice(1)) {
      defer = defer.then(result =>
        resolveWithDirective(
          // eslint-disable-next-line no-undef
          () => Promise.resolve(result),
          source,
          directiveNext,
          context,
          info,
        ),
      );
      defer.catch(e =>
        resolveWithDirective(
          // eslint-disable-next-line no-undef
          () => Promise.reject(e),
          source,
          directiveNext,
          context,
          info,
        ),
      );
    }

    return defer;
  };
};

/**
 * Scanning the shema and wrapping the resolve of each field with the support
 * of the graphql custom directives resolve execution
 */
const wrapFieldsWithMiddleware = (type, deepWrap = true, typeMet = {}) => {
  if (!type) {
    return;
  }

  const fields = type._fields;
  typeMet[type.name] = true;
  for (const label in fields) {
    const field = fields[label];
    if (field && !typeMet[field.type.name]) {
      if (!!field && typeof field == 'object') {
        field.resolve = resolveMiddlewareWrapper(
          field.resolve,
          field.directives,
        );
        if (field.type._fields && deepWrap) {
          wrapFieldsWithMiddleware(field.type, deepWrap, typeMet);
        } else if (field.type.ofType && field.type.ofType._fields && deepWrap) {
          let child = field.type;
          while (child.ofType) {
            child = child.ofType;
          }
          if (child._fields) {
            wrapFieldsWithMiddleware(child._fields);
          }
        }
      }
    }
  }
};

/**
 * create a new graphql custom directive which contain a resolve
 * function for altering the execution of the graphql
 */
const createDirective = config => {
  const directive = new GraphQLDirective(config);

  if (config.resolve) {
    directive.resolve = config.resolve;
  }

  return directive;
};

/**
 * Apply custom directives support in the graphql schema
 */
const applyCustomDirectives = schema => {
  if (!(schema instanceof GraphQLSchema)) {
    throw new Error('Schema must be instanceof GraphQLSchema');
  }

  wrapFieldsWithMiddleware(schema._queryType);
  wrapFieldsWithMiddleware(schema._mutationType, false);

  return true;
};

export { createDirective, applyCustomDirectives };
