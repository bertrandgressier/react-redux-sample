import {combineReducers} from 'redux';
import {combineEpics} from 'redux-observable';
import {search, searchEpic} from './searchPanel/search.reducer';
import {authEpic, authReducer} from './login/auth.reducer';
import {routerReducer} from 'react-router-redux';

export const rootReducer = combineReducers({
  search,
  user: authReducer,
  router: routerReducer,
});

export const rootEpic = combineEpics(
  searchEpic,
  authEpic);





