import { Kind } from "graphql";

export const addDirectiveToType = (typeDef, typeName, directiveDefinition = {}) => {
  if (Object.keys(directiveDefinition).length) {
    typeDef.definitions
      ?.find(def =>
        def.kind === Kind.OBJECT_TYPE_DEFINITION
        && def.name.value === typeName
      )
      ?.directives
      ?.push(directiveDefinition);
  }
};

export const addDirectiveToField = (typeDef, typeName, fieldName, directiveDefinition = {}) => {
  if (Object.keys(directiveDefinition).length) {
    typeDef.definitions
      ?.find(type =>
        type.kind === Kind.OBJECT_TYPE_DEFINITION
        && type.name.value === typeName
      )?.fields
      ?.find(field =>
        field.kind === Kind.FIELD_DEFINITION
        && field.name.value === fieldName)
      ?.directives
      ?.push(directiveDefinition);
  }
};
