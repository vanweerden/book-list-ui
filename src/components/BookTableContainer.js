// Stateful container for BookList component
// Fetches book list from API and stores them in state

import React from 'react';
// import ReactDOM from 'react-dom';
import { BookTable } from './BookTable';

export class BookTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    const url = 'http://localhost:5000/books';
    fetch(url)
      .then( res => {
        console.log(res);
        return res.json();
      })
      .then( data => {
        console.log(data);
        this.setState({ books: data });
      }
    )
    .catch(err => console.log("ERROR:", err.message));
  }

  render() {
    console.log(this.state.books);
    return (
      <BookTable books={this.state.books} />
    );
  }
}
