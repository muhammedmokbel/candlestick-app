import React, { useState, useEffect, useRef } from 'react';
import {connect } from 'react-redux'; 

import Chart from "react-apexcharts";
import { getStocks, updateDateRange, updateInterval } from '../../redux/stocks/slice';
import stocksSelector from '../../selectors/stocksSelector';

import {FormGroup, Input ,Label } from 'reactstrap'; 

import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

import chartsConfig from '../../lib/chartsConfig.json'; 




const Home = ({getStocks, stocks, updateInterval, updateDateRange, isloading}) => {
    const [candleStickOptions, setCandleStickOptions] = useState({...chartsConfig.candlestick}); 
    
    useEffect(() => {
        getStocks(); 
    }, []);
    useEffect(() => {
        if (stocks.length)
        {
            
            setCandleStickOptions({
                ...chartsConfig.candlestick, 
          series: [{
          data: stocks
        }],
        
        }
); 
            }
    }, [stocks]);

    return (
        <>
            
            <div className='container my-5'>
                <div className='row'>
                    <div className='col-6'>
             <FormGroup>
    <Label for="interval">
      Interval 
    </Label>
    <Input
      id="interval"
      name="select"
      type="select"
    defaultValue={'1d'}
    onChange={(e) => {
        updateInterval(e.target.value); 
    }}
    >
      <option value={'1d'}>
        day
      </option>
      <option value={'1wk'}>
        week
      </option>
      <option value={'1mo'}>
        month
      </option>
     
    </Input>
                        </FormGroup>
                    </div>
                    <div className='col-6  '>
                            <Label for="interval">
                            date range 
                            </Label>
                        <RangePicker
                            onChange={(date) => {
                                if (!date)
                            updateDateRange();
                                else 
                                updateDateRange(new Date(date[0]).getTime().toString().slice(0,10), new Date(date[1]).getTime().toString().slice(0,10));
                            

                            }}
                            style={{ width: '100%' }}
                         
                        />
                    </div>
                    </div>

                </div>
        
   
        <div>
            {candleStickOptions.series  &&  <div style={{width:'90%', margin : 'auto'}}>
                <Chart
              options={candleStickOptions.options}
              series={candleStickOptions.series}
              type="candlestick"
              width="100%"
                />
            
            </div>
            }
              
            </div>
                 </>
    );
};

const mapStateToProps = (state) => {
    return {
        stocks: stocksSelector(state.stocks.chartData), 
        isloading : state.stocks.isloading
    };
}; 

const mapDispatchToProps = (dispatch) => {
    return {
        getStocks: () => dispatch(getStocks()), 
        updateInterval: (interval) => dispatch(updateInterval(interval)), 
        updateDateRange : (from, to) => dispatch(updateDateRange({from, to}))
    };
}; 

export default connect(mapStateToProps, mapDispatchToProps)(Home) ;
