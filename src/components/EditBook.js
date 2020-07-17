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
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className='table-row book-item'>
        <form method="update"
              // TODO
              // onSubmit={}
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
                      />
            </div>

            <div className="table-cell form-cell form-finished">
              <input  type="date"
                      name="finished"
                      defaultValue={trimDate(this.state.finished)}
                      required/>
            </div>

            <div className="table-cell form-cell form-pages">
              <input  type="text"
                      name="pages"
                      defaultValue={this.state.pages}
                      maxLength="4"/>
            </div>

            <div className="table-cell form-cell form-language">
              <select name="language"
                      className="clickable">
                <option value="english">English</option>
                <option value="japanese">Japanese</option>
                <option value="french">French</option>
                <option value="latin">Latin</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
