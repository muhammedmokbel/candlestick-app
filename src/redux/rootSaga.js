import { all, fork } from 'redux-saga/effects';

import stocksSagaWatcher from './stocks/saga';


export default function* rootSaga () {
    yield all([
        fork(stocksSagaWatcher)
    ]);
}