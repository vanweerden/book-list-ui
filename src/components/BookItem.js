// Present individual books as table rows. Parent: Book display

import React from 'react';
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

    this.bookItem = React.createRef();
    this.setBookItem = this.setBookItem.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
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

  // Deactivates edit mode when onclick outside of current component
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setBookItem(node) {
    this.bookItem = node;
  }

  handleClickOutside(event) {
    if (this.state.editMode === true &&
        this.bookItem &&
       !this.bookItem.current.contains(event.target)) {
      this.setState(prevState => {
        return { editMode: !prevState.editMode };
      });
    }
  }

  render() {
    if (this.state.editMode) {
      return (
        <div ref={this.bookItem}>
          <EditBook
            title={this.props.book.title}
            authorFirstName={this.props.book.authorFirstName}
            authorLastName={this.props.book.authorLastName || ''}
            finished={parseDate(this.props.book.finished)}
            pages={this.props.book.pages}
            type={this.props.book.type}
            id={this.props.book.id}
            bookListChange={this.props.bookListChange}
            deactivateEdit={this.toggleEdit}
          />
        </div>
      );
    } else {
      return (
        <div ref={this.bookItem}>
          <BookInfo
            title={this.props.book.title}
            author={this.props.book.authorFirstName + ' '
              + (this.props.book.authorLastName ? ' '
              + this.props.book.authorLastName : '')}
            finished={parseDate(this.props.book.finished)}
            pages={this.props.book.pages}
            type={this.props.book.type}
            id={this.props.book.id}
            deleteMethod={this.props.deleteMethod}
            toggleEdit={this.toggleEdit}
          />
        </div>
      );
    }
  }
}
