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
      pages: null,
      language: 'english',
      blurb: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form method="post" action="">
        <input  type="text"
                id="form-title"
                name="title"
                placeholder="Title"
                maxlength="50"
                onChange={this.handleChange}
                value={this.state.title}
                required />
        <input  type="text"
                id="form-author"
                name="author"
                placeholder="Author: First Last"
                maxlength="40"
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
                maxlength="4"
                onChange={this.handleChange}
                />
        <select name="language" id="form-language"
                onChange={this.handleChange}>
          <option value="english">English</option>
          <option value="japanese">Japanese</option>
          <option value="french">French</option>
          <option value="latin">Latin</option>
        </select>
        <textarea name="blurb"
                  id="form-blurb"
                  placeholder="Summary (240 characters)"
                  onChange={this.handleChange}
                  value={this.state.blurb}
                  maxlength="140" />
        <input  type="submit"
                value="Add Book"
                />
      </form>
    )
  }
}
