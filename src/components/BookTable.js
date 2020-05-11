// Presentational component for BookListContainer
// Generates table of BookItem components listed by date read (default)
// May have to add another stateful container stateful to handle different ways of sorting books: default--by date for now

import React from 'react';
import { BookItem } from './BookItem';

export const BookTable = (props) => {
  // Make sure books are sorted by date
  const books = props.books.sort( function(a, b) {
    a = a.finished;
    b = b.finished;
    return a > b ? -1 : a < b ? 1 : 0;
  });

  const listItems = books.map( (item) => <BookItem book={item} key={item.id}/>);

  return (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Date Finished</th>
        <th>Pages</th>
        <th>Language</th>
        <th>Blurb</th>
      </tr>
    </thead>
    <tbody>
      {listItems}
    </tbody>
  </table>
  );

}
