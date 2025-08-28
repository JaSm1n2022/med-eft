// @flow
import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import TOAST from '../../modules/toastManager';
import {
  get, post, sendPut, sendDelete
} from '../../modules/api/request';
import { handleSagaError } from '../../utils/helperFunctions';

import {
  IMS_ACTIONS,
  setParseMedicaidSucceed,
  setParseMedicaidFailure,
  setParseMedicareSucceed,
  setParseMedicareFailure
} from '../actions/imsAction';


const RESOURCE_PREFIX = 'v1/media';


function* parseMedicaid(payload) {
    try {
      console.log('[payload]',payload);
      const { data } = yield post(`${RESOURCE_PREFIX}/medicaid`, payload.payload, true);
      TOAST.ok('Ims successfully created.');
      yield put(setParseMedicaidSucceed(data));
    } catch (err) {
      const error = handleSagaError(err);
      yield put(setParseMedicaidFailure(error.debug));
      TOAST.error(error.debug);
    }
 
}

function* parseMedicare(payload) {
  try {
    console.log('[payload]',payload);
    const { data } = yield post(`${RESOURCE_PREFIX}/medicare`, payload.payload, true);
    TOAST.ok('Ims successfully created.');
    yield put(setParseMedicareSucceed(data));
  } catch (err) {
    const error = handleSagaError(err);
    yield put(setParseMedicareFailure(error.debug));
    TOAST.error(error.debug);
  }

}









function* imsSagaWatcher<T>(): Iterable<T> {

  yield takeLatest(IMS_ACTIONS.ATTEMPT_TO_PARSE_MEDICAID, parseMedicaid);
  yield takeLatest(IMS_ACTIONS.ATTEMPT_TO_PARSE_MEDICARE, parseMedicare);
  
}

export default imsSagaWatcher;

