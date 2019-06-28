import { CHANGE_CHART_DATA, CHANGE_TIME_FUNCTION, CHANGE_INTERVAL } from "../actions/chartActions";

export default function chartReducer(state={
    timeFunc: 'TIME_SERIES_INTRADAY',
    interval: '5min',
    dataChart: [],
}, action) {
    switch(action.type) {
        case CHANGE_TIME_FUNCTION: {
            return Object.assign({}, state, {timeFunction: action.payload} );
        }
        case CHANGE_INTERVAL: {
            return Object.assign({}, state, {interval: action.payload});
            }
        case CHANGE_CHART_DATA: {
            return Object.assign({}, state, {chartData: action.payload});
        }
        default:
            return state;
    }
};