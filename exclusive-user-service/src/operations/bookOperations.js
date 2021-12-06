import books from '../db/book-db';
import { getAuthor } from './authorOperations';

import { v1 } from 'uuid';
const genId = () => v1();

export const createBook = input => {
  const newBook = {
    id: genId(),
    ...input,
  };
  books.unshift(newBook);
  return newBook;
};

export const createBooks = input => {
  const booksInput = input.map(book => ({
    id: genId(),
    ...book,
  }));
  books.push(...booksInput);
  return booksInput;
};

export const getBooks = () => books;
// {
//   return books.map(book => {
//     book.author = getAuthor(book.authorId);
//     return book;
//   });
// };

export const getBook = id => books.find(book => book.id === id);
// {
//   const book = books.find(book => book.id === id);
//   book.author = getAuthor(book.authorId);
//   return book;
// };
