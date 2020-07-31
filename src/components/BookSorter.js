// Receives array of books from BookFetch and sorts them based on field chosen and asc/desc

import React from 'react';
import { TableDisplay } from './TableDisplay';

export class BookSorter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'finished',
      ascend: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.sortBooks = this.sortBooks.bind(this);
  }

  handleClick(e) {
    const field = e.target.getAttribute("id");
    if (field === this.state.sortBy) {
      this.setState((state, props) => ({
        ascend: !state.ascend
      }), this.sortBooks);
    } else {
      this.setState((state, props) => ({
        sortBy: field,
        ascend: true
      }));
    }
  }

  sortBooks() {
    const field = this.state.sortBy;
    const ascending = this.state.ascend;
    const sortedBooks = this.props.books.sort( function(a, b) {
      a = a[field];
      b = b[field];
      if (ascending) {
        return a < b ? -1 : a > b ? 1 : 0;
      } else {
        return a > b ? -1 : a < b ? 1 : 0;
      }
    });
    return sortedBooks;
  }

  render() {
    const sortedBooks = this.sortBooks(this.props.books);
    return (
      <TableDisplay
        handleClick={this.handleClick}
        active={this.state.sortBy}
        ascend={this.state.ascend}
        books={sortedBooks}
        bookListChange={this.props.bookListChange}
        deleteMethod={this.props.deleteMethod}
      />
    );
  }
}
