// Used for Edit and Delete buttons on side of BookInfo

import React, { useState } from 'react';

export const SideButton = (props) => {
  const [content, setContent] = useState(props.inactiveContent);
  return (
    <div
      className={props.class}
      onMouseEnter={() => setContent(props.activeContent)}
      onMouseLeave={() => setContent(props.inactiveContent)}
      onClick={() => { props.clickMethod() }}
    >
      {props.shouldRender ? content : null}
    </div>
  );
}
