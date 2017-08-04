import {FETCH_SEARCH, FETCH_SEARCH_FULFILLED, fetchSearchFulfilled,} from './search.action';
import peopleList from '../people.json';
import {Observable} from 'rxjs';

const initialState = {
  search: '',
  isFetching: false,
  people: [],
};

export const search = (state = initialState, action) => {

  switch (action.type) {
    case FETCH_SEARCH:
      return {
        ...state,
        search: action.searchText,
        isFetching: true,
      };
    case FETCH_SEARCH_FULFILLED:
      return {
        ...state,
        isFetching: false,
        people: action.people,
      };
    default:
      return state;
  }
};

export const searchEpic = action$ =>
  action$.ofType(FETCH_SEARCH)
    .map($action => peopleList.filter(person => person.name.includes($action.searchText)))
    .delay(1000)
    .map(people => fetchSearchFulfilled(people));