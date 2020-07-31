import React, { useState } from 'react';

export const EditButton = (props) => {
  const [content, setContent] = useState('✎');
  return (
    <div
      className='edit-button'
      onMouseEnter={() => setContent('EDIT')}
      onMouseLeave={() => setContent('✎')}
      onClick={() => { props.activateEdit() }}
    >
      {props.shouldRender ? content : null}
    </div>
  );
}
