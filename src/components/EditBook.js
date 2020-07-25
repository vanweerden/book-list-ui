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
      author: this.props.authorFirstName + ' ' + this.props.authorLastName,
      finished: this.props.finished,
      pages: this.props.pages,
      type: this.props.type,
    };
    this.handleInput = this.handleInput.bind(this);
    this.getChanges = this.getChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.format = this.format.bind(this);
    this.sendPutRequest = this.sendPutRequest.bind(this);
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  getChanges() {
    let changes = this.state;
    changes.authorFirstName = parseName(changes.author, 'first');
    changes.authorLastName = parseName(changes.author, 'last');
    delete changes.author;

    for (let field of Object.keys(changes)) {
      if (changes[field] === this.props[field] && field !== 'id') {
        delete changes[field];
      }
    }
    return changes;
  }

  checkForChangesIn(fields) {
    let changesDetected = false;
    for (let field of Object.keys(fields)) {
      if (field !== 'id') {
        changesDetected = true;
      }
    }
    return changesDetected;
  }

  format(editedData) {
    let dataToSend = editedData;

    if (dataToSend.pages) {
      dataToSend.pages = parseInt(dataToSend.pages);
    }

    dataToSend.id = parseInt(dataToSend.id);
    return dataToSend = JSON.stringify(dataToSend);
  }

  sendPutRequest() {
    let changedData = this.getChanges();
    // If no fields have been changed, don't send HTTP request
    if (!this.checkForChangesIn(changedData)) {
      return;
    }

    const dataToSend = this.format(changedData);

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
    let selectTag;
    if (this.props.type === "non-fiction") {
      selectTag = (<select name="type"
                            className="clickable"
                            onChange={this.handleInput}>
                      <option value="fiction">Fiction</option>
                      <option value="non-fiction" selected>Non-Fiction</option>
                   </select>);
    } else {
      selectTag = (<select name="type"
                            className="clickable"
                            onChange={this.handleInput}>
                      <option value="fiction" selected>Fiction</option>
                      <option value="non-fiction">Non-Fiction</option>
                    </select>);
    }

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
              {selectTag}
            </div>

            <div className="table-cell form-cell">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
