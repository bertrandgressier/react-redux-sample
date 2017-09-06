import { Person } from '../../../react-redux-sample/src/root.type';

export enum SearchTypeKeys {
    FETCH_SEARCH = 'FETCH_SEARCH',
    FETCH_SEARCH_FULFILLED = 'FETCH_SEARCH_FULFILLED'
}

export interface FetchSearchAction {
    type: SearchTypeKeys.FETCH_SEARCH;
    search: string;
}
export const fetchSearch = (search: string): FetchSearchAction =>
    ({ type: SearchTypeKeys.FETCH_SEARCH, search });

export interface FetchSearchFulfilledAction {
    type: SearchTypeKeys.FETCH_SEARCH_FULFILLED;
    people: Array<Person>;
}
export const fetchSearchFulfilled = (people: Array<Person>): FetchSearchFulfilledAction =>
    ({ type: SearchTypeKeys.FETCH_SEARCH_FULFILLED, people });

export type SearchAction =
    | FetchSearchAction
    | FetchSearchFulfilledAction;