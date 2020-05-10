// Fetches book list from API and stores them in state
// Stateful container for BookList component
import React from 'react';
import ReactDOM from 'react-dom';
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
    console.log(Array.isArray(this.state.books));
    // console.log(this.state.books.length);
    return (
      // <div></div>
      <BookTable books={this.state.books} />
    );
  }
}
