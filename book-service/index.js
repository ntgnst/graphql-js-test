import { schema, resolvers } from './npm';
import { ApolloServer, gql } from 'apollo-server';
import { printSchema, Kind } from 'graphql';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { addDirectiveToType } from './helper';

const typeDefs = gql(printSchema(schema));
const newResolvers = {
  ...resolvers, Book: {
    ...resolvers.Book,
    __resolveReference(ref) {
      console.log(JSON.stringify(ref));

      return {
        id: 1,
        pageCount: 231,
        price: 11.11,
        name: 'A'
      };
    }
  }
}

addDirectiveToType(typeDefs, 'Book', {
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
});

const subGraphSchema = buildSubgraphSchema({
  typeDefs,
  newResolvers,
});

const server = new ApolloServer({
  schema: subGraphSchema,
});

server.listen(4010).then(({ url }) => {
  console.log('Running a GraphQL API server at localhost:4010/graphql');
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


/// NOT
// schema ve resolvers npm üzerinden geliyor olacak.
