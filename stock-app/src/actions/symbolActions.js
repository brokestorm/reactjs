export const CHANGE_SYMBOL = 'CHANGE_SYMBOL';
export const FETCH_SEARCH_DATA_PENDING = 'FETCH_SEARCH_DATA_PENDING';
export const FETCH_SEARCH_DATA_FULFILLED = 'FETCH_SEARCH_DATA_FULFILLED';
export const FETCH_SEARCH_DATA_ERROR = 'FETCH_SEARCH_DATA_ERROR';

export function changeSymbol(payload){
    return{
    type: 'CHANGE_SYMBOL',
    payload
    };
}

export function fetchSearchDataPending(){
    return{
    type: 'FETCH_SEARCH_DATA_PENDING',
    };
}

export function setSearchData(payload){
    return{
    type: 'FETCH_SEARCH_DATA_FULFILLED',
    payload
    };
}
export function searchDataError(payload){
    return{
    type: 'FETCH_SEARCH_DATA_ERROR',
    payload
    };
}
