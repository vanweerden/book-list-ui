// Stateful container for BookList component
// Fetches book list from API and stores them in state

import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { EditBookList } from './EditBookList';

export class FetchData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
    };
    this.fetchBooks = this.fetchBooks.bind(this);
    this.bookListChange = this.bookListChange.bind(this);
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
  bookListChange() {
    this.fetchBooks();
  }

  render() {
    if (this.state.books == null) {
      return <div>Loading...</div>
    } else {
      return (
        <EditBookList books={this.state.books}
                      bookListChange={this.bookListChange} />
      );
    }
  }
}
