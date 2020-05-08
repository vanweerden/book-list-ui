// Fetches book list from API and stores them in state
// Stateful container for BookList component
import React from 'react';
import ReactDOM from 'react-dom';
import { BookList } from './BookList';

export class BookListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    const url = 'http://localhost:5000/books';
    fetch(url)
      .then( res => res.json() )
      .then( data => {
        let updatedBooks = this.state.books.concat(data);
        this.setState({
          books: updatedBooks
        });
      }
    )
    .catch(err => console.log("ERROR:", err.message));
  }

  render() {
    // return <BookList />;
    return this.state.books;
  }
}
