// UPDATES book (form appears when EDIT button clicked)
import React, { Component } from 'react';
import { parseName } from '../utils/parseName';
import { trimDate } from '../utils/dateFunctions';

export class EditBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      author: this.props.authorFirst + ' ' + this.props.authorLast,
      finished: this.props.finished,
      pages: this.props.pages,
      language: this.props.language,
      blurb: this.props.blurb,
      type: this.props.type,
    };
    this.handleInput = this.handleInput.bind(this);
    this.getChangesIn = this.getChangesIn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.format = this.format.bind(this);
    this.sendPutRequest = this.sendPutRequest.bind(this);
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  getChangesIn(submittedData) {
    let changes = submittedData;
    for (let field of Object.keys(submittedData)) {
      if (changes[field] === this.props[field] && field !== 'id') {
        delete changes[field];
      }
    }
    return changes;
  }

  format(changedData) {
    let dataToSend = changedData;
    if (dataToSend.author) {
      dataToSend.authorFirstName = parseName(dataToSend.author, 'first');
      dataToSend.authorLastName = parseName(dataToSend.author, 'last');
      delete dataToSend.author;
    }

    if (dataToSend.pages) {
      dataToSend.pages = parseInt(dataToSend.pages);
    }

    dataToSend.id = parseInt(dataToSend.id);
    return dataToSend = JSON.stringify(dataToSend);
  }

  sendPutRequest() {
    const dataToSend = this.format(this.getChangesIn(this.state));
    fetch('http://localhost:5000/books/' + this.state.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: dataToSend,
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
  }

  handleSubmit(e) {
    e.preventDefault();
    this.sendPutRequest();
    this.props.deactivateEdit();
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
