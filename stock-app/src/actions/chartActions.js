export const CHANGE_TIME_FUNCTION = 'CHANGE_TIME_FUNCTION';
export const CHANGE_INTERVAL = 'CHANGE_INTERVAL';
export const CHANGE_CHART_DATA = 'CHANGE_CHART_DATA';

export function changeTimeFunction(payload){
    return{
    type: 'CHANGE_TIME_FUNCTION',
    payload
    };
}

export function changeInterval(payload){
    return{
    type: 'CHANGE_INTERVAL',
    payload
    };
}

export function changeChartData(payload){
    return{
    type: 'CHANGE_TIME_FUNCTION',
    payload
    };
}