// https://spin.atomicobject.com/2017/07/24/redux-action-pattern-typescript/

export enum LoginTypeKeys {
    LOGGING_IN = 'LOGGING_IN',
    LOGGING_SUCCESS = 'LOGGING_SUCCESS',
    LOGGING_ERROR = 'LOGGING_ERROR',
    LOGOUT = 'LOGOUT',
    UNAUTHORIZED = 'UNAUTHORIZED'
}

export interface LoggingInAction {
    type: LoginTypeKeys.LOGGING_IN;
    username: string;
    password: string;
}
export const loggingIn = (username: string, password: string): LoggingInAction =>
    ({ type: LoginTypeKeys.LOGGING_IN, username, password });

export interface UserLogin {
    token: object;
    accessToken: string;
}
export interface LoggingSuccessAction {
    type: LoginTypeKeys.LOGGING_SUCCESS;
    user: UserLogin;
}
export const loggingSuccess = (user: UserLogin): LoggingSuccessAction =>
    ({ type: LoginTypeKeys.LOGGING_SUCCESS, user });

export interface LoggingErrorAction {
    type: LoginTypeKeys.LOGGING_ERROR;
    error: object;
}
export const loggingError = (error: object): LoggingErrorAction =>
    ({ type: LoginTypeKeys.LOGGING_ERROR, error });

export interface LogoutAction {
    type: LoginTypeKeys.LOGOUT;
}
export const logout = (): LogoutAction =>
    ({ type: LoginTypeKeys.LOGOUT });

export interface UnauthorizedAction {
    type: LoginTypeKeys.UNAUTHORIZED;
    state: string;
}
export const unAuthorized = (pathname: string): UnauthorizedAction =>
    ({ type: LoginTypeKeys.UNAUTHORIZED, state: pathname });

export type LoginActionTypes =
    | LoggingInAction
    | LoggingSuccessAction
    | LogoutAction
    | LoggingErrorAction
    | UnauthorizedAction;
