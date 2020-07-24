// Present individual books as table rows
import React, { useState } from 'react';
import { parseDate } from '../utils/dateFunctions';
import { DeleteButton } from './DeleteButton';
import { EditBook } from './EditBook';
import { EditButton } from './EditButton';

export const BookItem = (props) => {
  // useState returns current state value and function to update it
  const [showDelete, setShowDelete] = useState(false);

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
      <div  className='table-row book-item'
            onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}>
        <div className='table-cell title'>{title}</div>
        <div className='table-cell author'>{authorFirst} {authorLast}</div>
        <div className='table-cell date'>{finished}</div>
        <div className='table-cell pages'>{pages}</div>
        <div className='table-cell language'>{language}</div>
        <div className='table-cell blurb'>{blurb}</div>
        <div className='book-item-buttons'>
          <DeleteButton id={id}
                      shouldRender={showDelete}
                      deleteMethod={props.deleteMethod}
                      />
          <EditButton id={id}
                      shouldRender={showDelete}
          />
        </div>
      </div>
      <EditBook title={title}
                authorFirst={authorFirst}
                authorLast={authorLast}
                finished={props.book.finished}
                pages={pages}
                language={language}
                blurb={blurb}
                id={id}
                bookListChange={props.bookListChange}
                />
    </div>
  );
}
