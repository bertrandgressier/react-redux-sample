import {LOGGING_IN, LOGGING_SUCCESS, loggingSuccess, LOGOUT, UNAUTHORIZED} from './login.action';
import {push} from 'react-router-redux';
import {combineEpics} from 'redux-observable';

const initialState = {
  authenticated: false,
  accessToken: null,
  name: null,
};

export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOGGING_IN:
      return state;
    case LOGGING_SUCCESS:
      return {
        authenticated: true,
        accessToken: action.user.accessToken,
        name: action.user.name

      };
    case LOGOUT:
      return {...initialState};
    default:
      return state;
  }
};

export const userLoginEpic = action$ =>
  action$.ofType(LOGGING_IN)
    .mapTo(loggingSuccess({name: 'Bertrand', accessToken: 'XXXXXXXXXXXXXXXXXXXXX'}));

export const authenticationRouterEpic = action$ =>
  action$.ofType(UNAUTHORIZED)
    .mapTo(push('/login'));

export const authEpic = combineEpics(authenticationRouterEpic, userLoginEpic);
