import {createSlice} from '@reduxjs/toolkit';


export const stocksSlice = createSlice({
    name : 'alert', 
    initialState: {
        isloading: false, 
        chartData: [], 
        filter: {
            interval: '1d', 
            from: '1633381200', 
            to : '1664917199'
        }
    }, 
    reducers : {
        getStocks :  (state , action) => {
            state.isloading = true; 
        }, 
        getStocksSuccess: (state, action) => {
  
            state.isloading = false; 
            state.chartData = action.payload; 
        }, 
        getStocksFail :  (state , action) => {
            state.isloading = false; 
            state.chartData = action.payload; 
        }, 
        updateInterval : (state, action) => {
            state.isloading = true; 
            state.filter.interval = action.payload; 
        }, 
        updateIntervalSuccess: (state, action) => {
            state.isloading = false; 
            state.chartData = action.payload; 
        }, 
        updateIntervalFail: (state, action) => {
            state.isloading = false; 
            state.chartData = []; 
        }, 
        updateDateRange: (state, action) => {
            state.isloading = true;
            state.filter = {
                ...state.filter,
                ...action.payload
            }; 
        },
        updateDateRangeSuccess: (state, action) => {
            state.isloading = false;
            state.chartData = action.payload; 
        }, 
        updateDateRangeFail: (state, action) => {
            state.isloading = false;
            state.chartData = []; 
        }
    }
});

export const {getStocks, getStocksFail , getStocksSuccess, updateInterval, updateIntervalSuccess, updateIntervalFail, updateDateRange, updateDateRangeSuccess, updateDateRangeFail}  = stocksSlice.actions; 
export default stocksSlice.reducer; 