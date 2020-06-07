// Intermediate component between FetchBooks and SortBooks
// Applies functions for adding, deleting, and updating books before sending to BookSorter to be sorted

import React from 'react';
import { BookSorter } from './BookSorter';

export const EditBooks = (props) => {
  const books = props.books;
  // TODO
  // const deleteBook = (id) => {
  //
  // }

  return (
    <BookSorter books={books}
                postedNewBook={props.postedNewBook}/>
  );
}
