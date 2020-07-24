import React, { useState } from 'react';

export const EditButton = (props) => {
  const [content, setContent] = useState('✎');
  return (
    <div  className='edit-button'
          onClick={() => {
            // Edit appears; BookItem info disappears
          }}
          onMouseEnter={() => setContent('EDIT')}
          onMouseLeave={() => setContent('✎')}>
      {props.shouldRender ? content : null}
    </div>
  );
}
