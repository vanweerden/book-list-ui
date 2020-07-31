import React from 'react';

export const HeaderButton = (props) => {
  let arrow;
  if (props.active) {
    if (props.asc) arrow = '▴';
    else arrow = '▾';
  } else {
    arrow = null;
  }

  return (
    <div
      className={props.classes}
      onClick={props.handleClick}
      id={props.id}
    >
      {props.columnName} {arrow}
    </div>
  );
}
