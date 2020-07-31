// UPDATES book (form appears when EDIT button clicked)
import React, { Component } from 'react';
import { AddBook } from './AddBook';
import { parseName } from '../utils/parseName';
import { trimDate } from '../utils/dateFunctions';

export class EditBook extends AddBook {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      author: this.props.authorFirstName + ' ' + this.props.authorLastName,
      finished: this.props.finished,
      pages: this.props.pages,
      type: this.props.type,
      errors: {
        title: '',
        author: '',
        pages: '',
      }
    };
    this.getChanges = this.getChanges.bind(this);
    this.format = this.format.bind(this);
    this.handleSubmitAndDeactivateEdit = this.handleSubmitAndDeactivateEdit.bind(this);
  }

  getChanges() {
    let changes = this.state;
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

  fetchRequest(entry) {
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

  handleSubmitAndDeactivateEdit(e) {
    this.handleSubmit(e);
    this.props.deactivateEdit();
  }

  render() {
    const {errors} = this.state;

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
        <form
          method="put"
          onSubmit={this.handleSubmitAndDeactivateEdit}
          className="book-form"
          noValidate
        >
          <div className='table-row form-row'>
            <div className="table-cell form-cell form-title">
              <input
                type="text"
                name="title"
                maxLength="50"
                defaultValue={this.state.title}
                onChange={this.handleChange}
                required
              />
              <div className='error'>
                {errors.title.length > 0 && errors.title}
              </div>
            </div>

            <div className="table-cell form-cell form-author">
              <input
                type="text"
                name="author"
                maxLength="40"
                defaultValue={this.state.author}
                onChange={this.handleChange}
              />
              <div className='error'>
                {errors.author.length > 0 && errors.author}
              </div>
            </div>

            <div className="table-cell form-cell form-finished">
              <input
                type="date"
                name="finished"
                defaultValue={trimDate(this.state.finished)}
                onChange={this.handleChange}
                required
              />
              <div className='error'></div>
            </div>

            <div className="table-cell form-cell form-pages">
              <input
                type="text"
                name="pages"
                defaultValue={this.state.pages}
                onChange={this.handleChange}
                maxLength="4"
              />
              <div className='error'>{
                errors.pages.length > 0 && errors.pages}
              </div>
            </div>

            <div className="table-cell form-cell form-type">
              <select
                name="type"
                className="clickable"
                onChange={this.handleInput}
                defaultValue={this.state.type}
              >
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
              </select>
            </div>

            <div className="table-cell form-cell">
              <button
                type="submit"
                className="button submit-button"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
