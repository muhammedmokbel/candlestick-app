import { call, put, takeEvery , select} from "redux-saga/effects";
import {getStocksSuccess, updateInterval, updateIntervalSuccess ,stocksSlice, updateDateRangeSuccess} from './slice'; 
import BackendService from "../../services/servicesInstances/BackendService";

import Papa from 'papaparse';


// worker


function* getStocksSaga() {
  try {
    const filter = yield select(state => state.stocks.filter);
    const respond = yield call(BackendService.request, BackendService.getStocks({...filter})); 

      const { data } = yield call(BackendService.parse, respond.data);

      const formattingData = yield call(BackendService.formattingData, data); 
     
      yield put(getStocksSuccess(formattingData)); 
      
      
  } catch (error) {
      console.log(error); 
  }
}

function* updateIntervalSaga({payload}) {
  try {
const filter = yield select(state => state.stocks.filter);
    const respond = yield call(BackendService.request, BackendService.getStocks({...filter})); 

    const { data } = yield call(BackendService.parse, respond.data);

    const formattingData = yield call(BackendService.formattingData, data); 
    
   
    yield put(updateIntervalSuccess(formattingData)); 
      
      
  } catch (error) {
      console.log(error); 
  }
}

function* updateDateRangeSaga({payload}) {
  try {
   const filter = yield select(state => state.stocks.filter);
    const respond = yield call(BackendService.request, BackendService.getStocks({...filter})); 

    const { data } = yield call(BackendService.parse, respond.data);

    const formattingData = yield call(BackendService.formattingData, data); 
    
   
    yield put(updateDateRangeSuccess(formattingData)); 
      
      
  } catch (error) {
      console.log(error); 
  }
}





// watcher
export default function* stocksSagaWatcher() {
  yield takeEvery(stocksSlice.actions.getStocks.type, getStocksSaga);
  yield takeEvery(stocksSlice.actions.updateInterval.type, updateIntervalSaga);
    yield takeEvery(stocksSlice.actions.updateDateRange.type, updateDateRangeSaga);
  
}
