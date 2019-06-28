import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

//console.log(store.getState());

//const unsubscribe = store.subscribe(()=>console.log(store.getState()));

//store.dispatch(changeSymbol('MSFT'));

export default createStore();