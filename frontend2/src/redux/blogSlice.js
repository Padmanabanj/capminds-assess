import { createSlice } from '@reduxjs/toolkit';
import blogData from '../blog.json';

const initialState = {
  posts: blogData,
  searchResults: blogData,
  searchTerm: '',
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    searchPosts: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { searchPosts, setSearchResults } = blogSlice.actions;
export default blogSlice.reducer;

// Selectors
export const selectPosts = (state) => state.blog.posts;
export const selectSearchResults = (state) => state.blog.searchResults;
export const selectSearchTerm = (state) => state.blog.searchTerm;