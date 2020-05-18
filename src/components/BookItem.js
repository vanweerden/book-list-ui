// Present individual books as table rows
import React from 'react';
import { convertDate } from '../utils/convertDate'

export const BookItem = (props) => {
  const title = props.book.title;
  const authorFirst = props.book.authorFirstName;
  const authorLast = props.book.authorLastName;
  const finished = convertDate(props.book.finished);
  const pages = props.book.pages;
  const language = props.book.language;
  const blurb = props.book.blurb;

  return (
    <div className='table-row book-item'>
      <div className='table-cell title'>{title}</div>
      <div className='table-cell author'>— {authorFirst} {authorLast}</div>
      <div className='table-cell date-finished'>Finished on {finished}</div>
      <div className='table-cell pages'>{pages}</div>
      <div className='table-cell language'>{language}</div>
      <div className='table-cell blurb'>{blurb}</div>
    </div>
  );
}
