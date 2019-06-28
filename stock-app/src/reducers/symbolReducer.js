import {  CHANGE_SYMBOL, FETCH_SEARCH_DATA_PENDING, FETCH_SEARCH_DATA_FULFILLED, FETCH_SEARCH_DATA_ERROR } from "../actions/symbolActions";

export default function symbolReducer(state={
    symbol: '',
    fetched: false,
    fetching: false,
    searchData: {},
    error: null,
}, action) {
    switch(action.type) {
        case CHANGE_SYMBOL: {
            return Object.assign({}, state, {symbol: action.payload});
        }
        case FETCH_SEARCH_DATA_PENDING: {
            return Object.assign({}, state, {fetching: true});

        }
        case FETCH_SEARCH_DATA_FULFILLED: {
            return Object.assign({}, state, {fetching:false, fetched: true, searchData: action.payload});
            }
        case FETCH_SEARCH_DATA_ERROR: {
            return Object.assign({}, state, {fetching: false, error: action.payload});
        }
        default:
            return state;
    }

};