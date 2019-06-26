export default function reducer(state={
    timeFunc: 'TIME_SERIES_INTRADAY',
    interval: '5min',
    dataChart: [],
    xAxis: 19,
}, action) {
    switch(action.type) {
        case "CHANGE_TIME_FUNCTION": {
            state = {...state, timeFunction: action.payload}
            break;
        }
        case "CHANGE_INTERVAL": {
            state = {...state, interval: action.payload}
            break;
            }
        case "CHANGE_CHART_DATA": {
            state = {...state, chartData: action.payload}
            break;
        }
        case "CHANGE_CHART_X_AXIS": {
            state = {...state, xAxis: action.payload}
            break;
        }
    }
    return state;
};