import React, { useState } from 'react';

// Displays 'X' when mouse hovers on BookItem
export const DeleteButton = (props) => {
  const [content, setContent] = useState('X');
  return (
    <div  className='delete-button'
          onClick={() => {
            window.confirm('Are you sure you want to delete this item?') &&
              props.deleteMethod(props.id)
          }}
          onMouseEnter={() => setContent('DELETE')}
          onMouseLeave={() => setContent('X')}
    >
      {props.shouldRender ? content : null}
    </div>
  );
}
