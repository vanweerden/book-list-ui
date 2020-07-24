// Present individual books as table rows
import React, { useState } from 'react';
import { parseDate } from '../utils/dateFunctions';
import { BookInfo } from './BookInfo';
import { EditBook } from './EditBook';

export class BookItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      editMode: false
    }
    this.toggleHover = this.toggleHover.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleHover() {
    this.setState(function(prevState) {
      return { hover: !prevState.hover }
    });
  }

  toggleEdit() {
    this.setState(function(prevState) {
      return { editMode: !prevState.editMode }
    });
  }
  // const [hover, setHover] = useState(false);
  // const [editActivated, activateEdit] = useState(false);

  // const title = props.book.title;
  // const authorFirst = props.book.authorFirstName;
  // const authorLast = props.book.authorLastName;
  // const finished = parseDate(props.book.finished);
  // const pages = props.book.pages;
  // const language = props.book.language.charAt(0).toUpperCase() + props.book.language.slice(1);
  // const blurb = props.book.blurb;
  // const id = props.book.id;

  render() {
    if (this.state.editMode) {
      return (
        <EditBook
          title={this.props.book.title}
          authorFirst={this.props.book.authorFirstName}
          authorLast={this.props.book.authorLastName}
          finished={parseDate(this.props.book.finished)}
          pages={this.props.book.pages}
          language={this.props.book.language.charAt(0).toUpperCase() + this.props.book.language.slice(1)}
          blurb={this.props.book.blurb}
          id={this.props.book.id}
          bookListChange={this.props.bookListChange}
          deactivateEdit={this.toggleEdit}
        />
      );
    } else {
      return (
        <BookInfo
          title={this.props.book.title}
          author={this.props.book.authorFirstName + ' ' + this.props.book.authorLastName}
          finished={parseDate(this.props.book.finished)}
          pages={this.props.book.pages}
          language={this.props.book.language.charAt(0).toUpperCase() + this.props.book.language.slice(1)}
          blurb={this.props.book.blurb}
          id={this.props.book.id}
          deleteMethod={this.props.deleteMethod}
          toggleEdit={this.toggleEdit}
        />
      );
    }
  }

}
