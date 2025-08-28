import { all } from 'redux-saga/effects';
import authSaga from './authSaga';

import mediaSaga from './mediaSaga';
import imsSaga from './imsSaga';
export function* rootSaga() {
  yield all([
  authSaga(),
  mediaSaga(),
  imsSaga()
]);
}
