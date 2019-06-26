export default function reducer(state={
    symbol: '',
    fetched: false,
    fetching: false,
    searchData: {},
    error: null,
}, action) {
    switch(action.type) {
        case "CHANGE_SYMBOL": {
            state = {...state, symbol: action.payload}
            break;
        }
        case "FETCH_SEARCH_DATA_PENDING": {
            state = {...state, fetching: true}
            break;
        }
        case "FETCH_SEARCH_DATA_FULFILLED": {
            state = {...state, fetching:false, fetched: true, searchData: action.payload}
            break;
            }
        case "FETCH_SEARCH_DATA_ERROR": {
            state = {...state, fetching: false, error: action.payload}
            break;
        }
    }
    return state;
};