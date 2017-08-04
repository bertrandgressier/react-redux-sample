export const FETCH_SEARCH = 'FETCH_SEARCH';
export const FETCH_SEARCH_FULFILLED = 'FETCH_SEARCH_FULFILLED';

export const fetchSearch = (searchText) => ({type: FETCH_SEARCH, searchText});
export const fetchSearchFulfilled = (people) => ({type: FETCH_SEARCH_FULFILLED, people});