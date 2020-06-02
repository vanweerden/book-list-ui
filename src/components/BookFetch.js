// Stateful container for BookList component
// Fetches book list from API and stores them in state

import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { BookSorter } from './BookSorter';
import { AddBook } from './AddBook';

export class BookFetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
    };
    this.fetchBooks = this.fetchBooks.bind(this);
    this.postedNewBook = this.postedNewBook.bind(this);
  }

  fetchBooks() {
    const url = 'http://localhost:5000/books';
    fetch(url)
      .then( res => {
        console.log(res);
        return res.json();
      })
      .then( data => {
        console.log("Data Fetched: ", data);
        this.setState({ books: data });
      }
    )
    .catch(err => console.log("ERROR:", err.message));
  }

  componentDidMount() {
    this.fetchBooks();
  }

  // Triggered by POST in AddBook (passed as prop)
  postedNewBook() {
    this.fetchBooks();
  }

  render() {
    if (this.state.books == null) {
      return <div>Loading...</div>
    } else {
      return (
        <BookSorter books={this.state.books}
                    postedNewBook={this.postedNewBook} />
      );
    }
  }
}
