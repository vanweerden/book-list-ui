// Intermediate component between FetchBooks and SortBooks
// Applies functions for adding, deleting, and updating books before sending to BookSorter to be sorted

import React from 'react';
import { BookSorter } from './BookSorter';

export const EditBooks = (props) => {
  let books = props.books;
  // Will be passed as prop to DeleteButton
  // const deleteBook = (id) => {
  //   fetch('http://localhost:3000/books/' + id, {
  //     method: 'DELETE',
  //   })
  //   .then(res => res.json())
  //   .then(res => {
  //     console.log('Success', res);
  //     // Remove book from array before sending to BookSorter
  //     books = books.filter(book => book.id != id)
  //     console.log('Books array: ', books)
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // }

  const deleteTemp = (id) => {
    console.log('Deleting book id: ', id);
    console.log('New Array: ', books.filter(book => book.id != id));
  }

  return (
    <BookSorter books={books}
                postedNewBook={props.postedNewBook}
                deleteMethod={deleteTemp}/>
  );
}
