import { all, fork } from 'redux-saga/effects';

import stocksSagaWatcher from './stocks/saga';
import errorSagaWatcher from './errors/saga';


export default function* rootSaga () {
    yield all([
        fork(stocksSagaWatcher), 
        fork(errorSagaWatcher)
    ]);
}