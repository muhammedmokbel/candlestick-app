import BaseService from "../BaseService";
import Storage from '../../lib/Storage';
import { STORAGE_TAGS } from "../../constants/Storage";
import { backendDev } from "../../config";
import Papa from 'papaparse';



class BackendService extends BaseService{

    constructor(baseUrl, headers, token) {
        super(baseUrl, headers);
        this.token = token; 
        this.initInterceptors(); 
        
    }

    initInterceptors = () => {
        
        this.request.interceptors.request.use(this.interceptorsReq);
        this.request.interceptors.response.use(this.interceptorsRes);
    }; 

    interceptorsReq = (req) => {
        req.headers.Authorization = this.token; 

        return req;

    }; 
    
    interceptorsRes = (res) => {
        return res;

    }; 


    // endpoints 

    getStocks = ({interval  , from = '1633381200' , to = '1664917199' }) => ({
        url : `/SPUS?period1=${from}&period2=${to}&interval=${interval}&events=history`, 
        method : 'GET' , 
    });

    parse = (file) => {
        return new Promise((complete, error) => {
            Papa.parse(file, { complete, error });
        });
    };
    formattingData = (data) => {
        const rows = data.slice(1); 
        const cols = data[0]; 
        return  rows.map(row => {
            const obj = {};
            cols.forEach((col, index) => {
                obj[col ==='Adj Close'? col.replace(' ', '_') : col] = row[index]; 
            }); 
            return obj; 
        });

        
    };
}


export default new BackendService(backendDev.baseUrl,backendDev.headers,  Storage.getItem(STORAGE_TAGS.TOKEN) ); 
