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
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm(errors) {
    let valid = true;
    // Add to Anki
    Object.values(errors).forEach(
      // If there is an error string, sets value to false
      val => val.length > 0 && (valid = false)
    );
    return valid;
  }

  // Validate input and save to state
  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    // Author must be one or two words and only alpha characters
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
      case 'blurb':
        errors.blurb =
          value.length > 240
            ? 'Max 240 characters!'
            : '';
        break;
    }

    this.setState({errors, [name]: value}, () => {
      console.log(errors[name]);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // Check for errors
    if (this.validateForm(this.state.errors)) {
      console.log('Valid form');
    } else {
      console.log('Invalid form');
      return;
    }

    let entry = this.state;
    delete entry.errors;

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
      <form
        method="post"
        onSubmit={this.handleSubmit}
        id="new-book-form"
        noValidate>

        {/*First row of form*/}
        <div className='table-row form-row'>
          <div className="table-cell form-cell form-title">
            <input  type="text"
                    name="title"
                    placeholder="Title"
                    maxLength="50"
                    onChange={this.handleChange}
                    value={this.state.title}
                    required />
              <div className='error'>{errors.title.length > 0 && errors.title}</div>
          </div>

          <div className="table-cell form-cell form-author">
            <input  type="text"
                    name="author"
                    placeholder="Author: First Last"
                    maxLength="40"
                    onChange={this.handleChange}
                    value={this.state.author}
                    />
              <div className='error'>{errors.author.length > 0 && errors.author}</div>
          </div>

          <div className="table-cell form-cell form-finished">
            <input  type="date"
                    name="finished"
                    onChange={this.handleChange}
                    value={this.state.finished}
                    required/>
            <div className='error'></div>
          </div>

          <div className="table-cell form-cell form-pages">
            <input  type="text"
                    name="pages"
                    value={this.state.pages}
                    placeholder="Pages"
                    maxLength="4"
                    onChange={this.handleChange}/>
              <div className='error'>{errors.pages.length > 0 && errors.pages}</div>
          </div>

          <div className="table-cell form-cell form-language">
            <select name="language"
                    onChange={this.handleChange}
                    className="clickable">
              <option value="english">English</option>
              <option value="japanese">Japanese</option>
              <option value="french">French</option>
              <option value="latin">Latin</option>
            </select>
            <div className='error'></div>
          </div>
        </div>

        <div className="table-row form-bottom">
          <select name="type" id="form-type"
                  className="clickable form-cell"
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
          {errors.blurb.length > 0 &&
            <span className='error'>{errors.blurb}</span>}

          <input  type="submit"
                  value="Add Book"
                  className="button submit-button"
                  onSubmit={this.sendData}
                  />
        </div>
      </form>
    )
  }
}
