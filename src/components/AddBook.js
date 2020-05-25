// POSTS new book to database
// TODOs
// Split author name into first and last name
// Format today's date
import React from 'react';

export const AddBook = (props) => {
  // Get today's date in YYYY-MM-DD
  var today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  return (
    <form method="post">
      <input  type="text"
              id="form-title"
              name="title"
              placeholder="Title"
              maxlength="50"
              required />
      <input  type="text"
              id="form-author"
              name="author"
              placeholder="Author: First Last"
              maxlength="40"
              />
      <input  type="date"
              id="form-finished"
              name="finished"
              value={today}
              required/>
      <input  type="text"
              id="form-pages"
              name="pages"
              placeholder="Pages"
              maxlength="4" />
      <select name="language" id="form-language">
        <option value="english">English</option>
        <option value="japanese">Japanese</option>
        <option value="french">French</option>
        <option value="latin">Latin</option>
      </select>
      <textarea name="blurb"
                id="form-blurb"
                placeholder="Summary (240 characters)"
                maxlength="140" />
      <input  type="submit"
              value="Add Book"/>
    </form>
  )
}
