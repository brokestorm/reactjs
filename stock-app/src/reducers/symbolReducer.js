import {  SUBMIT_NAME, FETCH_SEARCH_DATA_FULFILLED, FETCH_SEARCH_DATA_ERROR, SUBMIT_SYMBOL, CHANGE_INPUT } from "../actions/symbolActions";

export default function symbolReducer(state={
    symbol: '',
    symbolInput: '',
    name: '',
    searchList: [],
    error: null,
}, action) {
    switch(action.type) {
        case CHANGE_INPUT: {
            return Object.assign({}, state, {symbolInput: action.payload});
        }
        case SUBMIT_NAME: {
            return Object.assign({}, state, {name: action.payload});
        }
        case SUBMIT_SYMBOL: {
            return Object.assign({}, state, {symbol: action.payload});
        }
        case FETCH_SEARCH_DATA_FULFILLED: {
            return Object.assign({}, state, {searchList: action.payload});
        }
        case FETCH_SEARCH_DATA_ERROR: {
            return Object.assign({}, state, {error: action.payload});
        }
        default:
            return state;
    }

};