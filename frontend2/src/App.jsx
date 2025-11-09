import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BlogList from './components/BlogList';
import './blog.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <SearchBar />
      <BlogList />
    </div>
  );
};

export default App;