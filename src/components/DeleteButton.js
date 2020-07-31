// Displays 'X' when mouse hovers over BookItem

import React, { useState } from 'react';

export const DeleteButton = (props) => {
  const [content, setContent] = useState('X');
  return (
    <div
      className='delete-button'
      onMouseEnter={() => setContent('DELETE')}
      onMouseLeave={() => setContent('X')}
      onClick={() => {
        window.confirm('Are you sure you want to delete this item?')
          && props.deleteMethod(props.id)
      }}
    >
      {props.shouldRender ? content : null}
    </div>
  );
}
