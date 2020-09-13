// UPDATES book information (form appears when EDIT button clicked)

import React from 'react';
import { AddBook } from './AddBook';
import { BookForm } from './BookForm';
import { parseName } from '../utils/parseName';

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
    this.submitEdits = this.submitEdits.bind(this);
  }

  submitEdits(e) {
    this.handleSubmit(e);
    this.props.deactivateEdit();
  }

  fetchRequest(entry) {
    let changedData = this.getChanges();
    // If no fields have been changed, don't send HTTP request
    if (!this.checkForChangesIn(changedData)) return;

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
      // Method from BookFetch to rerender all books
      this.props.bookListChange();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  getChanges() {
    let changes = JSON.parse(JSON.stringify(this.state));
    for (let field in changes) {
      if (changes[field] === this.props[field] && field !== 'id') {
        delete changes[field];
      }
    }
    return changes;
  }

  checkForChangesIn(fields) {
    let changesDetected = false;
    for (let field in fields) {
      if (field !== 'id') {
        changesDetected = true;
      }
    }
    return changesDetected;
  }

  format(editedData) {
    let dataToSend = editedData;
    delete dataToSend.errors;

    if (dataToSend.pages) {
      dataToSend.pages = parseInt(dataToSend.pages);
    }

    dataToSend.id = parseInt(dataToSend.id);

    if (dataToSend.author) {
      let fullname = dataToSend.author;
      dataToSend.authorFirstName = parseName(fullname, 'first');
      dataToSend.authorLastName = parseName(fullname, 'last');
      delete dataToSend.author;
    }
    return dataToSend = JSON.stringify(dataToSend);
  }

  render() {
    const {errors} = this.state;
    return (
      <BookForm
        httpMethod={"put"}
        handleSubmit={this.submitEdits}
        handleChange={this.handleChange}
        cancelEdit={this.props.deactivateEdit}
        editMode={true}
        title={this.state.title}
        author={this.state.author}
        errors={errors}
        finished={this.state.finished}
        pages={this.state.pages}
        type={this.state.type}
        cancelEdit={this.props.deactivateEdit}
      />
    );
  }
}
