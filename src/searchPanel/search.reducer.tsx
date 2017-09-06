import { FetchSearchAction, fetchSearchFulfilled, SearchAction, SearchTypeKeys, } from './search.action';
import { ActionsObservable, Epic } from 'redux-observable';
import { AppAction, ApplicationStore, Person, SearchState } from '../../../react-redux-sample/src/root.type';
const peopleList = require('../people.json');

const initialState: SearchState = {
    search: '',
    isFetching: false,
    people: [],
};

export const searchReducer = (state: SearchState = initialState, action: SearchAction): SearchState => {

    switch (action.type) {
        case SearchTypeKeys.FETCH_SEARCH:
            return {
                ...state,
                search: action.search,
                isFetching: true,
            };
        case SearchTypeKeys.FETCH_SEARCH_FULFILLED:
            return {
                ...state,
                isFetching: false,
                people: action.people,
            };
        default:
            return state;
    }
};

export const searchEpic: Epic<AppAction, ApplicationStore> = (action$: ActionsObservable<FetchSearchAction>) =>
    action$.ofType(SearchTypeKeys.FETCH_SEARCH)
        .map($action => peopleList.filter((person: Person) => person.name.includes($action.search)))
        .delay(1000)
        .map((people: Array<Person>) => fetchSearchFulfilled(people));