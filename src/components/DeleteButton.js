import React from 'react';

export const DeleteButton = (props) => {
  const handleClick = () => console.log("Click!");
  return (
    <div  className='delete-button'
          onClick={() => {
            window.confirm('Are you sure you want to delete this item?') &&
              props.deleteMethod(props.id)
          }}
    >
      {props.content}
    </div>
  );
}
