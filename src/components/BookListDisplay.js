// Displays sorted array of books from BookSorter

import React from 'react';
import { BookItem } from './BookItem';

export const BookListDisplay = (props) => {
  const listItems = props.books.map( (item) => <BookItem book={item} key={item.id} deleteMethod={props.deleteMethod} />);
  return <div>{listItems}</div>
}
