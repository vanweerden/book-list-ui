import React from 'react';
import { Header } from './Header';
import { BookFetch } from './BookFetch';
import { AddBook } from './AddBook';

export const App = () => (
  <div id="app">
    <Header />
    <BookFetch />
    <AddBook />
  </div>
);
