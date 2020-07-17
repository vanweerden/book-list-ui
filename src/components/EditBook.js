// UPDATES book (form appears when EDIT button clicked)
import React, { Component } from 'react';
import { parseName } from '../utils/parseName';
import { trimDate } from '../utils/dateFunctions';

export const EditBook = props => {
  return (
    <div className='table-row book-item'>
      <form method="update">

        <div className='table-row form-row'>
          <div className="table-cell form-cell form-title">
            <input  type="text"
                    name="title"
                    maxLength="50"
                    value={props.title}
                    required />
          </div>

          <div className="table-cell form-cell form-author">
            <input  type="text"
                    name="author"
                    maxLength="40"
                    value={props.author}
                    />
          </div>

          <div className="table-cell form-cell form-finished">
            <input  type="date"
                    name="finished"
                    value={trimDate(props.finished)}
                    required/>
          </div>

          <div className="table-cell form-cell form-pages">
            <input  type="text"
                    name="pages"
                    value={props.pages}
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
            <div className='error'></div>
          </div>
        </div>
      </form>
    </div>
  )
}
