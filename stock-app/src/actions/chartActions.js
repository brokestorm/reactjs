export const CHANGE_TIME_FUNCTION = 'CHANGE_TIME_FUNCTION';
export const CHANGE_INTERVAL = 'CHANGE_INTERVAL';

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