// Intermediate component between FetchData and BookSorter

import React from 'react';
import { BookSorter } from './BookSorter';

export const BookDeleter = (props) => {
  let books = props.books;

  // Passed as prop to DeleteButton
  const deleteBook = (id) => {
    return fetch('http://localhost:5000/books/' + id, {
      method: 'DELETE',
    })
    .then(res => res.text())
    .then(res => {
      // re-fetches book list (to trigger re-rendering)
      props.bookListChange();
      console.log('Books array: ', books)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <BookSorter
      books={books}
      bookListChange={props.bookListChange}
      deleteMethod={deleteBook}
    />
  );
}
