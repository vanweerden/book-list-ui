// UPDATES book (form appears when EDIT button clicked)
import React, { Component } from 'react';
import { parseName } from '../utils/parseName';
import { trimDate } from '../utils/dateFunctions';

export class EditBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      author: this.props.author,
      finished: this.props.finished,
      pages: this.props.pages,
      language: this.props.language,
      blurb: this.props.blurb,
      type: this.props.type,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateBook = this.updateBook.bind(this);
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  updateBook(id) {
    const updatedEntry = this.state;

    // Add correct properties
    let fullname = updatedEntry.author;
    delete updatedEntry.author;
    updatedEntry.authorFirstName = parseName(fullname, 'first');
    updatedEntry.authorLastName = parseName(fullname, 'last');
    updatedEntry.pages = parseInt(updatedEntry.pages);
    console.log(updatedEntry);

    fetch('http://localhost:5000/books/' + id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(updatedEntry),
        })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      // re-fetches book list (to trigger re-rendering)
      this.props.bookListChange();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.updateBook(this.props.id);
  }

  render() {
    return (
      <div className='table-row book-item'>
        <form onSubmit={this.handleSubmit}
              id="edit-book-form"
              noValidate>

          <div className='table-row form-row'>
            <div className="table-cell form-cell form-title">
              <input  type="text"
                      name="title"
                      maxLength="50"
                      defaultValue={this.state.title}
                      onChange={this.handleInput}
                      required />
            </div>

            <div className="table-cell form-cell form-author">
              <input  type="text"
                      name="author"
                      maxLength="40"
                      defaultValue={this.state.author}
                      onChange={this.handleInput}
                      />
            </div>

            <div className="table-cell form-cell form-finished">
              <input  type="date"
                      name="finished"
                      defaultValue={trimDate(this.state.finished)}
                      onChange={this.handleInput}
                      required/>
            </div>

            <div className="table-cell form-cell form-pages">
              <input  type="text"
                      name="pages"
                      defaultValue={this.state.pages}
                      onChange={this.handleInput}
                      maxLength="4"/>
            </div>

            <div className="table-cell form-cell form-language">
              <select name="language"
                      className="clickable"
                      onChange={this.handleInput}>
                <option value="english">English</option>
                <option value="japanese">Japanese</option>
                <option value="french">French</option>
                <option value="latin">Latin</option>
              </select>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
