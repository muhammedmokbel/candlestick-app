import { call, put, takeEvery } from "redux-saga/effects";
import { openAlert } from '../alerts/slice';
import * as actionTypes from './actionTypes'; 
import history from "../../routes/history";


// worker


function* badRequestWorker({payload}) {
  try {
    yield put(openAlert({ message : payload, severity : "error"}));
  } catch (error) {
    yield put(serverError((500).toString(), error));
  }
}

function* unauthorizedWorker({payload}) {
  try {

    yield put(openAlert({ message : payload, severity : "error"}));
  } catch (error) {
    yield put(serverError((500).toString(), error));
  } finally {
      history.replace("/login");
    
  }
}

function* forbiddenWorker({payload}) {
  try {
 
    yield put(openAlert({ message : payload, severity : "error"}));
  } catch (error) {
    yield put(serverError((500).toString(), error));
  } finally {
    history.replace("/login");
  }
}

function* notfoundWorker({payload}) {
  try {

    yield put(openAlert({ message : payload, severity : "error"}));
  } catch (error) {
    yield put(serverError((500).toString(), error));
  }
}


function* networkError({payload}) {
  try {
    yield put(openAlert({ message : payload, severity : "error"}));
  } catch (error) {
    yield put(serverError((500).toString(), error));
  } finally {
    history.push("/networkError");
  }
}

function* serverErrorWorker({payload}) {
  try {
    yield put(openAlert({ message : payload, severity : "error"}));
  } catch (error) {
    console.log(error);
  } finally {
    history.push("/serverError");
  }
}

// watcher
export default function* errorSagaWatcher() {
  
  yield takeEvery('errors/' + actionTypes.BAD_REQUEST_ERROR.toString(), badRequestWorker);
  yield takeEvery(
    'errors/'+actionTypes.UNAUTHORIZED_ERROR.toString(),
    unauthorizedWorker
  );
  yield takeEvery('errors/'+actionTypes.FORBIDDEN_ERROR.toString(), forbiddenWorker);
  yield takeEvery('errors/'+actionTypes.NOTFOUND_ERROR.toString(), notfoundWorker);

  yield takeEvery('errors/'+actionTypes.SERVER_ERROR.toString(), serverErrorWorker);
  yield takeEvery('errors/'+actionTypes.NETWORK_ERROR.toString(), networkError);
}
