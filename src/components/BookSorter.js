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
  }

  componentDidUpdate() {
    const field = this.state.sortBy;
    const asc = this.state.ascend;

    const sortedBooks = this.state.books.sort( function(a, b) {
      a = a[field];
      b = b[field];
      if (asc) {
        return a < b ? -1 : a > b ? 1 : 0;
      } else {
        return a > b ? -1 : a < b ? 1 : 0;
      }
    });
    this.setState({
      books: sortedBooks
    });
  }

  render() {
    return (
    <div className='table'>
      <div className='table-row table-header'>
        <div className='table-cell title-header'>Title</div>
        <div className='table-cell author-header'>Author</div>
        <div className='table-cell date-header'>Finished</div>
        <div className='table-cell pages-header'>Pages</div>
        <div className='table-cell language-header'>Language</div>
        <div className='table-cell blurb-header'>Blurb</div>
      </div>
      <BookListDisplay books={this.state.books}/>
    </div>
    );
  }
}
