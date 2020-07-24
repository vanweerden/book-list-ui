// Displays Book Entry information
import React, { useState } from 'react';
import { DeleteButton } from './DeleteButton';
import { EditButton } from './EditButton';

export const BookInfo = (props) => {
  // useState returns current state value and function to update it
  const [hover, setHover] = useState(false);
  return (
    <div className='table-row book-item'
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}>
      <div className='table-cell title'>{props.title}</div>
      <div className='table-cell author'>{props.author}</div>
      <div className='table-cell date'>{props.finished}</div>
      <div className='table-cell pages'>{props.pages}</div>
      <div className='table-cell language'>{props.language}</div>
      <div className='table-cell blurb'>{props.blurb}</div>
      <div className='book-item-buttons'>
        <DeleteButton id={props.id}
                      shouldRender={hover}
                      deleteMethod={props.deleteMethod}
                      />
        <EditButton id={props.id}
                    shouldRender={hover}/>
      </div>
    </div>
  );
}
