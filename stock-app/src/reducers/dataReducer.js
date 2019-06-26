export default function reducer(state={
    error: null,
    data: {},
    fetched: false,
    fetching: false,
}, action) {
    switch(action.type) {
        case "FETCH_DATA_PENDING": {
            return Object.assign({}, state, {fetching: true });
        }
        case "FETCH_DATA_FULFILLED": {
            state = {...state, fetching:false, fetched: true, data: action.payload}
            break;
            }
        case "FETCH_DATA_ERROR": {
            state = {...state, fetching: false, error: action.payload}
            break;
        }
        default:
            return state;
    }
}

