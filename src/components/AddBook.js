// POSTS new book to database
import React from 'react';
import { BookForm } from './BookForm';
import { parseName } from '../utils/parseName';
import { today } from '../utils/dateFunctions';

const defaultState = {
  title: '',
  author: '',
  finished: today(),
  pages: '',
  type: 'fiction',
  errors: {
    title: '',
    author: '',
    pages: '',
  }
};

export class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.fetchRequest = this.fetchRequest.bind(this);
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach( val => val.length > 0 && (valid = false) );
    return valid;
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    const authorRegexp = /^[a-z]+( [a-z]+)?$/i;
    const pagesRegexp = /^\d+$/;

    switch (name) {
      case 'title':
        errors.title =
          value.length > 50
            ? 'Must not be more than 50 characters in length!'
            : '';
        break;
      case 'author':
        errors.author =
          value.length > 40
            ? 'Cannot me more than 40 characters in length!'
            : '';
          errors.author =
            value === '' || authorRegexp.test(value)
              ? ''
              : 'Must be one or two names, with alphabet characters only!';
        break;
      case 'pages':
        errors.pages =
          value === '' || pagesRegexp.test(value)
            ? ''
            : 'Please enter a number!';
        break;
    }

    this.setState({errors, [name]: value}, () => {
      console.log(errors[name]);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.validateForm(this.state.errors)) {
      console.log('Valid form');
    } else {
      console.log('Invalid form');
      return;
    }

    // Clean up data for http request
    let entry = this.state;
    delete entry.errors;
    let fullname = entry.author;
    delete entry.author;
    entry.authorFirstName = parseName(fullname, 'first');
    entry.authorLastName = parseName(fullname, 'last');
    entry.pages = parseInt(entry.pages);

    this.fetchRequest(entry);
  }

  fetchRequest(entry) {
    fetch('http://localhost:5000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success', data);
      // Method from BookFetch to fetch all books after post
      this.props.bookListChange();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    this.setState(defaultState);
  }

  render() {
    const {errors} = this.state;

    return (
      <BookForm
        httpMethod={"post"}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        editMode={false}
        title={this.state.title}
        author={this.state.author}
        errors={errors}
        finished={this.state.finished}
        pages={this.state.pages}
        type={this.state.type}
      />
    );
  }
}
