// POSTS new book to database
// NOTE: use parseName(name, ['first'/'last']) before sending

import React from 'react';
import { parseName } from '../utils/parseName';
import { today } from '../utils/dateFunctions';

export class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      finished: today(),
      pages: '',
      language: 'english',
      blurb: '',
      type: 'fiction',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // Save input to state
    const target = event.target;
    const value = target.value;
    const name = target.name;

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

    fetch('http://localhost:5000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success', data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {
    return (
      <form method="post" onSubmit={this.handleSubmit}>
        <input  type="text"
                id="form-title"
                name="title"
                placeholder="Title"
                maxLength="50"
                onChange={this.handleChange}
                value={this.state.title}
                required />
        <input  type="text"
                id="form-author"
                name="author"
                placeholder="Author: First Last"
                maxLength="40"
                onChange={this.handleChange}
                value={this.state.author}
                />
        <input  type="date"
                id="form-finished"
                name="finished"
                onChange={this.handleChange}
                value={this.state.finished}
                required/>
        <input  type="text"
                id="form-pages"
                name="pages"
                value={this.state.pages}
                placeholder="Pages"
                maxLength="4"
                onChange={this.handleChange}/>
        <select name="language" id="form-language"
                onChange={this.handleChange}>
          <option value="english">English</option>
          <option value="japanese">Japanese</option>
          <option value="french">French</option>
          <option value="latin">Latin</option>
        </select>
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
      </form>
    )
  }
}
