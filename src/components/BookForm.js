// Display component for EditBook and AddBook
/* Need to pass the following from EditBook and AddBook
- http method
- onSubmit
- handleChange
- editMode woth Boolean. If true, use edit properties. Else, use add book
- whole state, including errors and book fields
*/
import React from 'react';
import { trimDate } from '../utils/dateFunctions';

export const BookForm = (props) => {
  return (
    <form
      method={props.httpMethod}
      onSubmit={props.handleSubmit}
      className="book-form"
      noValidate
    >
      <div className='table-row form-row'>
        <div className="table-cell form-cell form-title">
          <input
            type="text"
            name="title"
            maxLength="50"
            placeholder={props.editMode ? null : "Title"}
            defaultValue={props.title}
            onChange={props.handleChange}
            required
          />
          <div className='error'>
            {props.errors.title.length > 0 && props.errors.title}
          </div>
        </div>

        <div className="table-cell form-cell form-author">
          <input
            type="text"
            name="author"
            maxLength="40"
            placeholder={props.editMode ? null : "Author: First Last"}
            defaultValue={props.author}
            onChange={props.handleChange}
          />
          <div className='error'>
            {props.errors.author.length > 0 && props.errors.author}
          </div>
        </div>

        <div className="table-cell form-cell form-finished">
          <input
            type="date"
            name="finished"
            defaultValue={trimDate(props.finished)}
            onChange={props.handleChange}
            required
          />
          <div className='error'></div>
        </div>

        <div className="table-cell form-cell form-pages">
          <input
            type="text"
            name="pages"
            maxLength="4"
            placeholder={props.editMode ? null : "Pages"}
            defaultValue={props.pages}
            onChange={props.handleChange}
          />
          <div className='error'>
            {props.errors.pages.length > 0 && props.errors.pages}
          </div>
        </div>

        <div className="table-cell form-cell form-type">
          <select
            name="type"
            id="form-type"
            className="clickable"
            defaultValue={props.type}
            onChange={props.handleChange}
          >
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
          </select>
        </div>

        <div className="table-cell form-cell">
          <input
            type="submit"
            value={props.editMode ? "Submit" : "Add Book"}
            className="button submit-button"
          />
        </div>
      </div>
    </form>
  );
}
