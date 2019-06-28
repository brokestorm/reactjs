export const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
export const FETCH_DATA_FULFILLED = 'FETCH_DATA_FULFILLED';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

export function fetchDataPending(){
    return{
    type: 'FETCH_DATA_PENDING'
    };
}

export function fetchDataFullfiled(payload){
    return{
    type: 'FETCH_DATA_FULLFILED',
    payload
    };
}

export function fetchDataError(payload){
    return{
        type: 'FETCH_DATA_ERROR',
        payload
    }
}