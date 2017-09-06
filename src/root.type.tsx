import { SearchAction } from './searchPanel/search.action';
import { LoginActionTypes } from './login/login.action';
import { RouterAction, RouterState } from 'react-router-redux';

export interface Person {
    index: number;
    age: number;
    name: string;
    gender: string;
    email: string;
    phone: number;
}

export interface SearchState {
    search: string;
    isFetching: boolean;
    people: Array<Person>;
}

export interface LoginState {
    authenticated: boolean;
    accessToken: string;
    name: string;
    logging: boolean;
    error?: object;
}

export interface ApplicationStore {
    user: LoginState;
    router: RouterState;
    search: SearchState;
}

export type AppAction =
  | SearchAction
  | LoginActionTypes
  | RouterAction;