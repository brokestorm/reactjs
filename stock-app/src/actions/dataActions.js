export const SET_CHART_OBJS = 'SET_CHART_OBJS';
export function setChartObjs(payload){
    return{
    type: SET_CHART_OBJS,
    payload
    };
}

export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export function fetchDataError(payload){
    return{
        type: 'FETCH_DATA_ERROR',
        payload
    }
}