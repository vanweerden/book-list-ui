// Receives array of books from BookFetch and sorts them based on field chosen and asc/desc

import React from 'react';
import { BookListDisplay } from './BookListDisplay';
import { HeaderButton } from './HeaderButton';

export class BookSorter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books,
      sortBy: 'finished',
      ascend: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.sortBooks = this.sortBooks.bind(this);
  }

  // Change state to values based on click, THEN calls sorting function
  handleClick(e) {
    const field = e.target.getAttribute("id");

    // Change state: sortBy OR toggle ascending/descending
    if (field === this.state.sortBy) {
      this.setState((state, props) => ({
        ascend: !state.ascend
      }), this.sortBooks);
    } else {
      this.setState((state, props) => ({
        sortBy: field,
        ascend: true
      }), this.sortBooks);
    }
  }

  sortBooks() {
    const field = this.state.sortBy;
    const asc = this.state.ascend;

    // const sortedBooks = this.state.books.sort( function(a, b) {
    const sortedBooks = this.props.books.sort( function(a, b) {
      a = a[field];
      b = b[field];
      if (asc) {
        return a < b ? -1 : a > b ? 1 : 0;
      } else {
        return a > b ? -1 : a < b ? 1 : 0;
      }
    });

    this.setState({ books: sortedBooks });
  }

  render() {
    return (
      <div className='table'>
        <div className='table-row table-header'>
          <HeaderButton
            classes={'table-cell title-header header-button'}
            handleClick={this.handleClick}
            columnName={'Title'}
            active={this.state.sortBy === 'title'}
            asc={this.state.ascend}
            id={'title'}
          />
          <HeaderButton
            classes={'table-cell author-header header-button'}
            handleClick={this.handleClick}
            columnName={'Author'}
            active={this.state.sortBy === 'authorLastName'}
            asc={this.state.ascend}
            id={'authorLastName'}
          />
          <HeaderButton
            classes={'table-cell date-header header-button'}
            handleClick={this.handleClick}
            columnName={'Finished'}
            active={this.state.sortBy === 'finished'}
            asc={this.state.ascend}
            id={'finished'}
          />
          <HeaderButton
            classes={'table-cell pages-header header-button'}
            handleClick={this.handleClick}
            columnName={'Pages'}
            active={this.state.sortBy === 'pages'}
            asc={this.state.ascend}
            id={'pages'}
          />
          <HeaderButton
            classes={'table-cell language-header header-button'}
            handleClick={this.handleClick}
            columnName={'Language'}
            active={this.state.sortBy === 'language'}
            asc={this.state.ascend}
            id={'language'}
          />
        </div>
        <BookListDisplay books={this.state.books}/>
      </div>
    );
  }
}
