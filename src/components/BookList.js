// Presentational component for BookListContainer
// Generates list of Book components

import React from 'react';
import { BookItem } from './BookItem';

export const BookList = (props) => {
  const listItems = props.books.map( (item) => <BookItem book={item} />);
  return <ul>{listItems}</ul>;
}
