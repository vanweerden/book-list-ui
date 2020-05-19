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
  <div className='table'>
    <div className='table-row table-header'>
      <div className='table-cell title-header'>Title</div>
      <div className='table-cell author-header'>Author</div>
      <div className='table-cell date-header'>Finished</div>
      <div className='table-cell pages-header'>Pages</div>
      <div className='table-cell language-header'>Language</div>
      <div className='table-cell blurb-header'>Blurb</div>
    </div>
    {listItems}
  </div>
  );

}
