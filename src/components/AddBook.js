// POSTS new book to database
import React, { Component } from 'react';
import { parseName } from '../utils/parseName';
import { today } from '../utils/dateFunctions';

const defaultState = {
  title: '',
  author: '',
  finished: today(),
  pages: '',
  language: 'english',
  blurb: '',
  type: 'fiction',
  errors: {
    title: '',
    author: '',
    pages: '',
    blurb: '',
  }
};

export class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Validate input and save to state
  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    // Author must be one or two words and only alpha characters
    const authorRegexp = /^[a-z]+( [a-z]+)?$/i;

    switch (name) {
      case 'title':
        errors.title =
          value.length <= 50
            ? 'Title cannot be more than 50 characters long!'
            : '';
        break;
      case 'author':
        errors.author =
          value.length <= 40
            ? 'Author cannot me more than 40 characters long!'
            : '';
          errors.author =
            authorRegexp.test(value)
              ? 'Must be one or two words, with alphabet characters only!'
              : '';
        break;
      case 'pages':
        errors.pages =
          Number.isInteger(value)
            ? 'Please enter a number'
            : '';
        break;
      case 'blurb':
        errors.blurb =
          value.length <= 240
            ? 'Blurb must be 240 characters or fewer!'
            : '';
        break;
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let entry = this.state;

    // Add correct properties
    let fullname = entry.author;
    delete entry.author;
    entry.authorFirstName = parseName(fullname, 'first');
    entry.authorLastName = parseName(fullname, 'last');
    entry.pages = parseInt(entry.pages);

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
      // Callback from parent (BookFetch) to rerender from db after post
      this.props.postedNewBook();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    this.setState(defaultState);
  }

  render() {
    return (
      <form
        method="post"
        onSubmit={this.handleSubmit}
        id="new-book-form"
        noValidate>
        <div className='table-row form-row'>
          <input  type="text"
                  className="table-cell form-title"
                  name="title"
                  placeholder="Title"
                  maxLength="50"
                  onChange={this.handleChange}
                  value={this.state.title}
                  required />
          <input  type="text"
                  className="table-cell form-author"
                  name="author"
                  placeholder="Author: First Last"
                  maxLength="40"
                  onChange={this.handleChange}
                  value={this.state.author}
                  />
          <input  type="date"
                  className="table-cell form-finished"
                  name="finished"
                  onChange={this.handleChange}
                  value={this.state.finished}
                  required/>
          <input  type="text"
                  className="table-cell form-pages"
                  name="pages"
                  value={this.state.pages}
                  placeholder="Pages"
                  maxLength="4"
                  onChange={this.handleChange}/>
          <select name="language" className="table-cell form-language"
                  onChange={this.handleChange}>
            <option value="english">English</option>
            <option value="japanese">Japanese</option>
            <option value="french">French</option>
            <option value="latin">Latin</option>
          </select>
        </div>
        <div className="table-row form-bottom">
          <select name="type" id="form-type"
                  onChange={this.handleChange}>
            <option value="fic">Fiction</option>
            <option value="nf">Non-Fiction</option>
          </select>
          <textarea name="blurb"
                    id="form-blurb"
                    placeholder="Summary (240 characters)"
                    onChange={this.handleChange}
                    value={this.state.blurb}
                    maxLength="140" />
          <input  type="submit"
                  value="Add Book"
                  onSubmit={this.sendData}
                  />
        </div>
      </form>
    )
  }
}
