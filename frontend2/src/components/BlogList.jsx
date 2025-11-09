import React from 'react';
import { useSelector } from 'react-redux';
import { selectSearchResults, selectSearchTerm } from '../redux/blogSlice';

const BlogList = () => {
  const posts = useSelector(selectSearchResults);
  const searchTerm = useSelector(selectSearchTerm);

  if (posts.length === 0 && searchTerm) {
    return (
      <div className="empty-state">
        <h3>No posts found</h3>
        <p>No results for "{searchTerm}"</p>
      </div>
    );
  }

  return (
    <div className="blog-list">
      {posts.map(post => (
        <div key={post.id} className="blog-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <div className="blog-meta">
            <span className="category">{post.category}</span>
            <span className="date">{post.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;