// Displays table header buttons: takes callbacks from BookSorter to update BookSorter state

import React, { Component } from 'react';
import { HeaderButton } from './HeaderButton';

export const TableHeader = (props) => {
  return (
    <div className='table-row table-header'>
      <HeaderButton
        classes={'table-cell title-header header-button'}
        handleClick={props.handleClick}
        columnName={'Title'}
        active={props.active === 'title'}
        asc={props.ascend}
        id={'title'}
      />
      <HeaderButton
        classes={'table-cell author-header header-button'}
        handleClick={props.handleClick}
        columnName={'Author'}
        active={props.active === 'authorLastName'}
        asc={props.ascend}
        id={'authorLastName'}
      />
      <HeaderButton
        classes={'table-cell date-header header-button'}
        handleClick={props.handleClick}
        columnName={'Finished'}
        active={props.active === 'finished'}
        asc={props.ascend}
        id={'finished'}
      />
      <HeaderButton
        classes={'table-cell pages-header header-button'}
        handleClick={props.handleClick}
        columnName={'Pages'}
        active={props.active === 'pages'}
        asc={props.ascend}
        id={'pages'}
      />
      <HeaderButton
        classes={'table-cell language-header header-button'}
        handleClick={props.handleClick}
        columnName={'Type'}
        active={props.active === 'type'}
        asc={props.ascend}
        id={'type'}
      />
      <div className={'header-spacer'}></div>
    </div>
  );
}
