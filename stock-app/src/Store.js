import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const initialDataState = {
    error: null,
    data: {},
    fetched: false,
    fetching: false,
}

const initialDataChartState = {
    timeFunc: 'TIME_SERIES_INTRADAY',
    interval: '5min',
    dataChart: [],
    xAxis: 19,
}

const initialSymbolState = {
    symbol: '',
    fetched: false,
    fetching: false,
    searchData: {},
    error: null,
}

const dataReducer = (state={initialDataState}, action)=>{
    switch(action.type) {
        case "FETCH_DATA_PENDING": {
            state = {...state, fetching: true}
            break;
        }
        case "FETCH_DATA_FULFILLED": {
            state = {...state, fetching:false, fetched: true, data: action.payload}
            break;
            }
        case "FETCH_DATA_ERROR": {
            state = {...state, fetching: false, error: action.payload}
            break;
        }
    }
    return state;
};

const chartReducer = (state={initialDataChartState}, action)=>{
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

const symbolReducer = (state={initialSymbolState}, action)=>{
    switch(action.type) {
        case "CHANGE_SYMBOL": {
            state = {...state, symbol: action.payload}
            break;
        }
        case "FETCH_SEARCH_DATA_PENDING": {
            state = {...state, fetching: true}
            break;
        }
        case "FETCH_SEARCH_DATA_FULFILLED": {
            state = {...state, fetching:false, fetched: true, searchData: action.payload}
            break;
            }
        case "FETCH_SEARCH_DATA_ERROR": {
            state = {...state, fetching: false, error: action.payload}
            break;
        }
    }
    return state;
};

const reducers = combineReducers({
    data: dataReducer,
    chart: chartReducer,
    symbol: symbolReducer,
});


const logger = (store) => next => (action) => {
    console.log("action fired", action);
    next(action);
};

const middleware = applyMiddleware(thunk, logger());

const store = createStore(reducer, middleware);

store.subscribe (()=>{
    console.log("store changed", store.getState())
});

export default createStore(reducer, middleware);