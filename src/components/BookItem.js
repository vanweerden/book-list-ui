// Present individual books

import React from 'react';

export const BookItem = (props) => {
  const title = props.book.title;
  const authorFirst = props.book.authorFirstName;
  const authorLast = props.book.authorLastName;
  const finished = props.book.finished;
  const pages = props.book.pages;
  const language = props.book.language;
  return <li>{title} by {authorFirst} {authorLast}</li>
}
