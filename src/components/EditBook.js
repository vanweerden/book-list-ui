// UPDATES book (form appears when EDIT button clicked)
import React, { Component } from 'react';
import { AddBook } from './AddBook';
import { BookForm } from './BookForm';
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

    return (
      <BookForm
        httpMethod={"put"}
        handleSubmit={this.handleSubmitAndDeactivateEdit}
        handleChange={this.handleChange}
        editMode={true}
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
