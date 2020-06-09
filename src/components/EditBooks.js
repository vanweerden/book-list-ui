// Intermediate component between FetchBooks and SortBooks
// Applies functions for adding, deleting, and updating books before sending to BookSorter to be sorted

import React from 'react';
import { BookSorter } from './BookSorter';

export const EditBooks = (props) => {
  let books = props.books;

  // Will be passed as prop to DeleteButton
  const deleteBook = (id) => {
    var id = id;
    return fetch('http://localhost:5000/books/' + id, {
      method: 'DELETE',
    })
    .then(res => res.text())
    .then(res => {
      // Remove book from array before sending to BookSorter (can't get BookSorter to re-render)
      // books = books.filter(book => book.id != id)

      // re-fetches book list (to trigger re-rendering)
      props.bookListChange();
      console.log('Books array: ', books)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <BookSorter books={books}
                bookListChange={props.bookListChange}
                deleteMethod={deleteBook}/>
  );
}
