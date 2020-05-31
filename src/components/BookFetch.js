// Stateful container for BookList component
// Fetches book list from API and stores them in state

import React from 'react';
// import ReactDOM from 'react-dom';
import { BookSorter } from './BookSorter';
import { AddBook } from './AddBook';

export class BookFetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
    };
    this.postedNewBook = this.postedNewBook.bind(this);
  }

  componentDidMount() {
    const url = 'http://localhost:5000/books';
    fetch(url)
      .then( res => {
        console.log(res);
        return res.json();
      })
      .then( books => {
        console.log("Initial state: ", books);
        this.setState({ books });
      }
    )
    .catch(err => console.log("ERROR:", err.message));
  }

  // Add book to state when book posted to db in AddBook
  postedNewBook(dataFromChild) {
    this.setState((state) => ({
      books: state.books.concat(dataFromChild),
    }),
    () => console.log("State updated", this.state));
  }

  render() {
    if (this.state.books == null) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <BookSorter books={this.state.books} />
          <AddBook callbackFromParent={this.postedNewBook} />
        </div>
      );
    }
  }
}
