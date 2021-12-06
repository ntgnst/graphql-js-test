import auhors from '../db/author-db';

import { v1 } from 'uuid';
const genId = () => v1();

export const createAuthor = input => {
  const newAuthor = {
    id: genId(),
    ...input,
  };
  auhors.unshift(newAuthor);
  return newAuthor;
};

export const createAuthors = input => {
  const authorsInput = input.map(author => ({
    id: genId(),
    ...author,
  }));
  auhors.push(...authorsInput);
  return authorsInput;
};

export const getAuthors = () => auhors;

export const getAuthor = id => auhors.find(author => author.id === id);
