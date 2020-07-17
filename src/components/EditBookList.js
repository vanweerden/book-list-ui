// Intermediate component between FetchBooks and SortBooks
// Applies functions for adding, deleting, and updating books before sending to BookSorter to be sorted

import React from 'react';
import { BookSorter } from './BookSorter';

export const EditBookList = (props) => {
  let books = props.books;

  // Will be passed as prop to DeleteButton
  const deleteBook = (id) => {
    var id = id;
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

  // Passed down to and called from EditBook component
  const updateBook = (id, body) => {
    return fetch('http://localhost:5000/books', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
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
    <BookSorter books={books}
                bookListChange={props.bookListChange}
                deleteMethod={deleteBook}
                updateMethod={updateBook}/>
  );
}
