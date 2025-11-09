import { put, takeLatest, delay, select } from 'redux-saga/effects';
import { searchPosts, setSearchResults, selectPosts } from './blogSlice';

function* handleSearch(action) {
  const searchTerm = action.payload;
  
  yield delay(300); // Smooth debounce
  
  const allPosts = yield select(selectPosts);
  
  if (!searchTerm.trim()) {
    yield put(setSearchResults(allPosts));
    return;
  }

  const results = allPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  yield put(setSearchResults(results));
}

export function* blogSaga() {
  yield takeLatest(searchPosts.type, handleSearch);
}