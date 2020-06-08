import React from 'react';

export const DeleteButton = (props) => {
  const handleClick = () => console.log("Click!");
  return (
    <div  className='delete-button'
          onClick={() => props.deleteMethod(props.id)}
    >
      {props.content}
    </div>
  );
}
