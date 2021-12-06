import { gql } from 'apollo-server';
import { readFileSync } from 'fs';

const typeDefs = gql`${readFileSync(__dirname.concat('/user.graphql'), 'utf8')}`;

export {
  typeDefs
};