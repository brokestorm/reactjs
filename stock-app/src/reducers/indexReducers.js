import { combineReducers } from 'redux';

import dataReducer from "./dataReducer";
import symbolReducer from "./symbolReducer";
import chartReducer from "./chartReducer";

export default combineReducers ({
    dataReducer,
    symbolReducer,
    chartReducer
})