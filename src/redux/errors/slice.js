import { createSlice } from '@reduxjs/toolkit';
import * as actionTypes from './actionTypes'; 

const errorSlice = createSlice({
    name: 'errors', 
    initialState: {
        error : null 
    }, 
    reducers: {
        [actionTypes.BAD_REQUEST_ERROR]: (state, action) => { 
            state.error = action.payload; 
        }, 
         [actionTypes.UNAUTHORIZED_ERROR]: (state, action) => {
            state.error = action.payload; 
        }, 
         [actionTypes.FORBIDDEN_ERROR]: (state, action) => {
            state.error = action.payload; 
        },
        [actionTypes.NOTFOUND_ERROR]: (state, action) => { 
         
            state.error = action.payload; 
        }, 
         [actionTypes.SERVER_ERROR]: (state, action) => {
            state.error = action.payload; 
        }, 
         [actionTypes.NETWORK_ERROR]: (state, action) =>
        {
            state.error = action.payload; 
        }
        
      
    }
}); 
const actions = errorSlice.actions; 
export { actions }; 
export default errorSlice.reducer; 