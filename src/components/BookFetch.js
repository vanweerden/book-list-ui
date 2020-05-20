// Stateful container for BookList component
// Fetches book list from API and stores them in state

import React from 'react';
// import ReactDOM from 'react-dom';
import { BookSorter } from './BookSorter';

export class BookFetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
    };
  }

  componentDidMount() {
    const url = 'http://localhost:5000/books';
    fetch(url)
      .then( res => {
        console.log(res);
        return res.json();
      })
      .then( books => {
        console.log(books);
        this.setState({ books });
      }
    )
    .catch(err => console.log("ERROR:", err.message));
  }

  render() {
    if (this.state.books == null) {
      return <div>Loading...</div>
    } else {
      return (
        <BookSorter books={this.state.books} />
      );
    }
  }
}
