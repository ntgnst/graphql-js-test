import { readFileSync } from 'fs';
import { gql } from 'apollo-server';

const typeDefs = gql`${readFileSync(__dirname.concat('/book.graphql'), 'utf8')}`;

export {
  typeDefs
};