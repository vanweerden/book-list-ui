// Stateful container for BookList component
// NB: fetchBooks() passed down to any components that make changes

import React from 'react';
import { BookDeleter } from './BookDeleter';

export class FetchData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
    };
    this.fetchBooks = this.fetchBooks.bind(this);
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
        this.setState({ books: data }, () => console.log(this.state.books));
      }
    )
    .catch(err => console.log("ERROR:", err.message));
  }

  componentDidMount() {
    this.fetchBooks();
  }

  render() {
    if (this.state.books == null) {
      return <div>Loading...</div>
    } else {
      return (
        <BookDeleter
          books={this.state.books}
          bookListChange={this.fetchBooks}
        />
      );
    }
  }
}
