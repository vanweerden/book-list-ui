import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './Header';
import { BookListContainer } from './BookListContainer';

export const App = () => (
  <div id="app">
    <Header />
    <BookListContainer />
  </div>
);
