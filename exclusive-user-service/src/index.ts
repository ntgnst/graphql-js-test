import { schema } from './schema/schema';
import { ApolloServer, gql } from 'apollo-server';
import { Kind, printSchema } from 'graphql';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { addDirectiveToAST } from './addDirectiveToAST';
import { resolvers } from './schema/resolvers';

const typeDefs = gql(printSchema(schema));

addDirectiveToAST(
  typeDefs.definitions.find(
    def =>
      def.kind === Kind.OBJECT_TYPE_DEFINITION && def.name.value === 'User',
  ),
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
  },
);

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
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
