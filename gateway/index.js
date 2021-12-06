import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer, gql } from 'apollo-server';
import { readFileSync } from 'fs';

const supergraphSdl = JSON.parse(JSON.stringify(readFileSync(__dirname.concat('/supergraph.graphql'), 'utf8')));

console.log(JSON.stringify(gql(supergraphSdl)))

const gateway = new ApolloGateway({
  supergraphSdl,
});

console.log(JSON.stringify(gateway.schema));

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

const port = process.env.PORT || 4100;

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
}).catch(err => { console.error(err) });