import { combineReducers, Reducer } from 'redux';
import { combineEpics } from 'redux-observable';
import { searchEpic, searchReducer } from './searchPanel/search.reducer';
import { authEpic, authReducer } from './login/auth.reducer';
import { routerReducer } from 'react-router-redux';
import { AppAction, ApplicationStore } from './root.type';

export const rootReducer: Reducer<ApplicationStore> = combineReducers<ApplicationStore>({
  search: searchReducer,
  user: authReducer,
  router: routerReducer,
});

export const rootEpic = combineEpics<AppAction, ApplicationStore>(
  searchEpic,
  authEpic
);