import { FETCH_DATA_ERROR, SET_CHART_OBJS } from "../actions/dataActions"

export default function dataReducer(state={
    error: null,
    chartObjs: [],
    vantKey: '79LT1U32C3F71WIT',
    
}, action) {
    switch(action.type) {
        case SET_CHART_OBJS: {
            return Object.assign({} , state, { chartObjs: action.payload} );
            }
        case FETCH_DATA_ERROR: {
            return Object.assign({}, state, { error: action.payload} );
        }
        default:
            return state;
    }
}

