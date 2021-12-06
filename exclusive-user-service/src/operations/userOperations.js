import users from '../db/user-db';
import { getBook } from './bookOperations';

import { v1 } from 'uuid';
const genId = () => v1();

export const createUser = input => {
  const newUser = {
    id: genId(),
    ...input,
  };
  users.unshift(newUser);
  return newUser;
};

export const createUsers = input => {
  const usersInput = input.map(user => ({
    id: genId(),
    ...user,
  }));
  users.push(...usersInput);
  return usersInput;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getUsers = () => users;
// {
//   return users.map(user => {
//     const books = user.books.map(ownedBook => {
//       const found = getBook(ownedBook.id);
//       return found;
//     });
//
//     user.books = books;
//     return user;
//   });
// };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getUser = id => users.find(user => user.id === id);
// {
//   const user = users.find(user => user.id === id);
//
//   // const books = user.books.map(ownedBook => {
//   //   const found = getBook(ownedBook.id);
//   //   return found;
//   // });
//
//   // user.books = books;
//   return user;
// };
