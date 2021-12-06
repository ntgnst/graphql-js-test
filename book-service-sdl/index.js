import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolver';

const subGraph = buildSubgraphSchema({ typeDefs, resolvers });
const server = new ApolloServer(
  { schema: subGraph, }
);

server.listen(4200).then(({ url }) => {
  console.log('Running a GraphQL API server at localhost:4200/graphql');
});