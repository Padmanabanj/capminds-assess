import React from 'react';
import { useSelector } from 'react-redux';
import { selectSearchResults, selectSearchTerm } from '../redux/blogSlice';

const Header = () => {
  const posts = useSelector(selectSearchResults);
  const searchTerm = useSelector(selectSearchTerm);

  return (
    <div className="header">
      <h1>Simple Blog</h1>
      <p>
        {searchTerm 
          ? `Found ${posts.length} posts for "${searchTerm}"`
          : `Showing all ${posts.length} posts`
        }
      </p>
    </div>
  );
};

export default Header;