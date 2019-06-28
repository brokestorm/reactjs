import { combineReducers } from 'redux';

import dataReducer from "./dataReducer";
import symbolReducer from "./symbolReducer";
import chartReducer from "./chartReducer";

const rootReducer = combineReducers ({
    dataReducer,
    symbolReducer,
    chartReducer
});

export default rootReducer;