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
    <tr id='book-item'>
      <td>{title}</td>
      <td>{authorFirst} {authorLast}</td>
      <td>{finished}</td>
      <td>{pages}</td>
      <td>{language}</td>
      <td>{blurb}</td>
    </tr>
  );
}
