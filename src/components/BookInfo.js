// Displays Book Entry information

import React, { useState } from 'react';
import { SideButton } from './SideButton';

export const BookInfo = (props) => {
  const [hover, setHover] = useState(false);
  const capitalisedType = props.type.replace(/\b\w/g, a => a.toUpperCase());
  return (
    <div
      className='table-row book-item'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className='table-cell title'>{props.title}</div>
      <div className='table-cell author'>{props.author}</div>
      <div className='table-cell date'>{props.finished}</div>
      <div className='table-cell pages'>{props.pages}</div>
      <div className='table-cell type'>{capitalisedType}</div>
      <div className='book-item-buttons'>
        <SideButton
          class='delete-button'
          id={props.id}
          shouldRender={hover}
          clickMethod={() => {
            window.confirm('Are you sure you want to delete this item?')
              && props.deleteMethod(props.id)
          }}
          activeContent={'DELETE'}
          inactiveContent={'X'}
        />
        <SideButton
          class='edit-button'
          id={props.id}
          shouldRender={hover}
          clickMethod={props.toggleEdit}
          activeContent={'EDIT'}
          inactiveContent={'✎'}
        />
      </div>
    </div>
  );
}
