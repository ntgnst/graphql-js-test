import { schema, resolvers } from './npm';
import { ApolloServer, gql } from 'apollo-server';
import { Kind, printSchema, extendSchema, GraphQLID, GraphQLString, parse } from 'graphql';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { addDirectiveToField, addDirectiveToType } from './helper';

const typeDefs = gql(printSchema(schema));

addDirectiveToType(typeDefs, 'User',
  {
    kind: Kind.DIRECTIVE,
    name: {
      kind: Kind.NAME,
      value: 'key',
    },
    arguments: [
      {
        kind: Kind.ARGUMENT,
        name: {
          kind: Kind.NAME,
          value: 'fields',
        },
        value: {
          kind: Kind.STRING,
          value: 'id',
          block: false,
        },
      },
    ],
  }
);

addDirectiveToField(typeDefs, 'Book', {
  kind: Kind.DIRECTIVE,
  name: {
    kind: Kind.NAME,
    value: "external"
  },
  arguments: []
});

const objectTypeExtension = {
  kind: Kind.DOCUMENT,
  definitions: [{
    kind: Kind.OBJECT_TYPE_EXTENSION,
    name: {
      kind: Kind.NAME,
      value: "Book"
    },
    interfaces: [

    ],
    directives: [
      {
        kind: Kind.DIRECTIVE,
        name: {
          kind: Kind.NAME,
          value: "key"
        },
        arguments: [
          {
            kind: Kind.ARGUMENT,
            name: {
              kind: Kind.NAME,
              value: "fields"
            },
            value: {
              kind: Kind.STRING,
              value: "id",
              block: false
            }
          }
        ]
      }
    ],
    fields: [
      {
        kind: Kind.FIELD_DEFINITION,
        name: {
          kind: Kind.NAME,
          value: "id"
        },
        arguments: [

        ],
        type: {
          kind: Kind.NON_NULL_TYPE,
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "ID"
            }
          }
        },
        directives: [
          {
            kind: Kind.DIRECTIVE,
            name: {
              kind: Kind.NAME,
              value: "external"
            },
            arguments: [

            ]
          }
        ]
      }
    ]
  }]
};

const subGraphSchema = buildSubgraphSchema({
  typeDefs,
  resolvers,
});

const extendedSchema = extendSchema(
  subGraphSchema,
  {
    kind: objectTypeExtension.kind,
    definitions: objectTypeExtension.definitions
  },
  {
    assumeValidSDL: true
  });

// console.log(JSON.stringify(gql(printSchema(buildSubgraphSchema({
//   typeDefs,
//   resolvers,
// })))));

// const test = parse(printSchema(extendedSchema));
console.log(printSchema(extendedSchema));

// console.log('Extension AST Nodes of Book :', JSON.stringify(extendedSchema.getTypeMap()));
const server = new ApolloServer({
  schema: extendedSchema,
});

server.listen(4000).then(({ url }) => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});

// NOTLAR:

// refactor atılacak. 26.11.2021

// builder fn.(npm paketi olacak)

// 1 - user (npm paketi olacak)
// 2 - books (npm paketi olacak) -> subgraph olacak. -> schema -> {typeDefs , resolver}
// 3 - subgraph(ExclusiveUsers) ta user daki resolver field ları ez.
// 4 - Proje gateway
// Schema yı plain obj. olarak oluştur.

// 2 subgraph oluşturup gateway i kaldır.
// @key ve __resolveReference() Mert ile görüş.

/// Refactor
/// Mert ile görüş __resolveReference() için