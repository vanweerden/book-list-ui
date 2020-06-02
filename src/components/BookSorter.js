// Receives array of books from BookFetch and sorts them based on field chosen and asc/desc

import React, { Component } from 'react';
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
      }));
    }
  }

  sortBooks(unsorted) {
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
        postedNewBook={this.props.postedNewBook}
      />
    );
  }
}
