import { FETCH_DATA_ERROR, FETCH_DATA_FULFILLED, FETCH_DATA_PENDING } from "../actions/dataActions"

export default function dataReducer(state={
    error: null,
    data: {},
    fetched: false,
    fetching: false,
}, action) {
    switch(action.type) {
        case FETCH_DATA_PENDING: {
            return Object.assign({}, state, {fetching: true });
        }
        case FETCH_DATA_FULFILLED: {
            return Object.assign({} , state, {fetching:false, fetched: true, data: action.payload} );
            }
        case FETCH_DATA_ERROR: {
            return Object.assign({}, state, {fetching: false, error: action.payload} );
        }
        default:
            return state;
    }
}

