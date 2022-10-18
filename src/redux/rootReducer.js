import {combineReducers} from 'redux';

import modalReducer from './modals/slice';
import alertReducer from './alerts/slice'; 
import stocksReducer from './stocks/slice';
import errorReducer from './errors/slice';

export default combineReducers({
   modal : modalReducer, 
   alert: alertReducer, 
   stocks: stocksReducer, 
   error : errorReducer
});