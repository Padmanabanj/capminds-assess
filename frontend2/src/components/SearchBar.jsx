import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts, selectSearchTerm } from '../redux/blogSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const handleChange = (e) => {
    dispatch(searchPosts(e.target.value));
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search posts by title or content..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;