// Presentational Component for main table items
// Receives props from BookSorter

import React from 'react';
import { TableHeader } from './TableHeader';
import { BookListDisplay } from './BookListDisplay';

export const TableDisplay = (props) => {
  return (
    <div className='table'>
      <TableHeader
        handleClick={props.handleClick}
        active={props.sortBy}
        ascend={props.ascend}
      />
      <BookListDisplay books={props.books}/>
    </div>
  );
};
