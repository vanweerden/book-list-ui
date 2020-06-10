// Presentational Component for main table items
// Receives props from BookSorter

import React from 'react';
import { TableHeader } from './TableHeader';
import { BookListDisplay } from './BookListDisplay';
import { AddBook } from './AddBook';

export const TableDisplay = (props) => {
  return (
    <div className='table'>
      <TableHeader
        handleClick={props.handleClick}
        active={props.active}
        ascend={props.ascend}
      />
      <BookListDisplay
        books={props.books}
        deleteMethod={props.deleteMethod}
      />
      <AddBook
        bookListChange={props.bookListChange}
      />
    </div>
  );
};
