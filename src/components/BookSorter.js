// Receives array of books from BookFetch and sorts them based on field chosen and asc/desc

import React from 'react';
import { BookListDisplay } from './BookListDisplay';

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

  // Changes state to values based on click, THEN calls sorting function
  handleClick(e) {
    // Grab field to sort by from header button
    let field;
    switch (e.target.innerText) {
      case 'Title':
        field = 'title';
        break;
      case 'Author':
        field = 'authorLastName';
        break;
      case 'Finished':
        field = 'finished';
        break;
      case 'Language':
        field = 'language';
        break;
      case 'Pages':
        field = 'pages';
        break;
      default:
        console.log("onClick: Something went wrong.");
    }

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
          <div className='table-cell title-header header-button'
               onClick={this.handleClick}>Title</div>
          <div className='table-cell author-header header-button'
               onClick={this.handleClick}>Author</div>
          <div className='table-cell date-header header-button'
               onClick={this.handleClick}>Finished</div>
          <div className='table-cell pages-header header-button'
               onClick={this.handleClick}>Pages</div>
          <div className='table-cell language-header header-button'
               onClick={this.handleClick}>Language</div>
          <div className='table-cell blurb-header header-button'>Blurb</div>
        </div>
        <BookListDisplay books={this.state.books}/>
      </div>
    );
  }
}
