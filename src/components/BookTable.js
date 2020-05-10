// Presentational component for BookListContainer
// Generates table of BookItem components

import React from 'react';
import { BookItem } from './BookItem';

export const BookTable = (props) => {
  const listItems = props.books.map( (item) => <BookItem book={item} />);
  return (
  <table>
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Date Finished</th>
      <th>Pages</th>
      <th>Language</th>
      <th>Blurb</th>
    </tr>
  {listItems}
  </table>
  );

}
