import React, { useState } from 'react';

export const EditButton = (props) => {
  // TODO: Set useState to a pencil icon
  const [content, setContent] = useState('✎');
  return (
    <div  className='edit-button'
          onClick={() => {
            // TODO
            window.confirm('Edit triggered!')
          }}
          onMouseEnter={() => setContent('EDIT')}
          onMouseLeave={() => setContent('✎')}
    >
      {props.shouldRender ? content : null}
    </div>
  );
}
