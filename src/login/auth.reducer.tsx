import {
    LoggingInAction,
    loggingSuccess,
    LoginActionTypes,
    LoginTypeKeys,
    UnauthorizedAction
} from './login.action';
import { push, RouterAction } from 'react-router-redux';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable';
import { AppAction, ApplicationStore, LoginState } from '../../../react-redux-sample/src/root.type';

const initialState: LoginState = {
    authenticated: false,
    accessToken: '',
    name: '',
    logging: false,
};

export const authReducer = (state: LoginState = initialState, action: LoginActionTypes): LoginState => {

    switch (action.type) {
        case LoginTypeKeys.LOGGING_IN:
            return {...state, logging: true};
        case LoginTypeKeys.LOGGING_ERROR:
            return {
                ...initialState,
                error: action.error,
            };
        case LoginTypeKeys.LOGGING_SUCCESS:
            return {
                ...initialState,
                authenticated: true,
                accessToken: action.user.accessToken,
                name: action.user.token['name'],
            };
        case LoginTypeKeys.LOGOUT:
            return {...initialState};
        default:
            return state;
    }
};

// EPIC
export const userLoginEpic: Epic<AppAction, ApplicationStore> = (action$: ActionsObservable<LoggingInAction>) =>
    action$.ofType(LoginTypeKeys.LOGGING_IN)
        .mapTo(loggingSuccess({token: {name: 'Bertrand'}, accessToken: 'XXXXXXXXXXXXXXXXXXXXX'}));

export const authenticationRouterEpic: Epic<LoginActionTypes | RouterAction, ApplicationStore> =
    (action$: ActionsObservable<UnauthorizedAction>) =>
        action$.ofType(LoginTypeKeys.UNAUTHORIZED)
            .mapTo(push('/login'));

export const authEpic = combineEpics(authenticationRouterEpic, userLoginEpic);
