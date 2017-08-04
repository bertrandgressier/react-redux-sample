export const LOGGING_IN = 'LOGGING_IN';
export const LOGGING_SUCCESS = 'LOGGING_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const UNAUTHORIZED = 'UNAUTHORIZED';

export const loggingIn = (username, password) => ({type: LOGGING_IN, username, password});
export const loggingSuccess = (user) => ({type: LOGGING_SUCCESS, user});
export const logout = () => ({type: LOGOUT});

export const unAuthorized = (pathname) => ({type: UNAUTHORIZED, state: pathname});