// Present individual books as table rows
import React, { useState } from 'react';
import { parseDate } from '../utils/dateFunctions';
import { BookInfo } from './BookInfo';
import { EditBook } from './EditBook';
import { DeleteButton } from './DeleteButton';
import { EditButton } from './EditButton';

export const BookItem = (props) => {
  // useState returns current state value and function to update it
  const [hover, setHover] = useState(false);

  const title = props.book.title;
  const authorFirst = props.book.authorFirstName;
  const authorLast = props.book.authorLastName;
  const finished = parseDate(props.book.finished);
  const pages = props.book.pages;
  const language = props.book.language.charAt(0).toUpperCase() + props.book.language.slice(1);
  const blurb = props.book.blurb;
  const id = props.book.id;

  return (
    <div>
      <BookInfo
        title={props.book.title}
        author={props.book.authorFirstName + ' ' + props.book.authorLastName}
        finished={parseDate(props.book.finished)}
        pages={props.book.pages}
        language={props.book.language.charAt(0).toUpperCase() + props.book.language.slice(1)}
        blurb={props.book.blurb}
        id={props.book.id}
        deleteMethod={props.deleteMethod}
      />

      <EditBook title={props.book.title}
                authorFirst={props.book.authorFirstName}
                authorLast={props.book.authorLastName}
                finished={parseDate(props.book.finished)}
                pages={props.book.pages}
                language={props.book.language.charAt(0).toUpperCase() + props.book.language.slice(1)}
                blurb={props.book.blurb}
                id={props.book.id}
                bookListChange={props.bookListChange}
                />
    </div>
  );
}
