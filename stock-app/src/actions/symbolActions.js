export const CHANGE_INPUT = 'CHANGE_INPUT';
export function changeInput(payload){
    return{
        type: CHANGE_INPUT,
        payload
    }
}

export const SUBMIT_NAME = 'SUBMIT_NAME';
export function submitName(payload){
    return{
        type: SUBMIT_NAME,
        payload
    };
}

export const SUBMIT_SYMBOL = 'SUBMIT_SYMBOL';
export function submitSymbol(payload){
    return {
        type: SUBMIT_SYMBOL,
        payload
    }
}

export const FETCH_SEARCH_DATA_FULFILLED = 'FETCH_SEARCH_DATA_FULFILLED';
export function setSearchData(payload){
    return{
        type: FETCH_SEARCH_DATA_FULFILLED,
        payload
    };
}

export const FETCH_SEARCH_DATA_ERROR = 'FETCH_SEARCH_DATA_ERROR';
export function searchDataError(payload){
    return{
    type: 'FETCH_SEARCH_DATA_ERROR',
    payload
    };
}
