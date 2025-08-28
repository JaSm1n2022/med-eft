// @flow

import { takeLatest, put } from 'redux-saga/effects';
import TOAST from '../../modules/toastManager';
import {
  get, post
} from '../../modules/api/request';
import { handleSagaError } from '../../utils/helperFunctions';


import { ACTION_STATUSES } from '../../utils/constants';
import uploadFile from '../../utils/uploadFile';

import {
  MEDIA_ACTIONS,
  setMediaUploadError,
  setMediaUploadStatus,
  setMediaUploadedUrl,
  setMediaWriteExcelFailure,
  setMediaWriteExcelSucceed,
 
} from '../actions/mediaAction';

const AWS_S3_PREFIX = 'v1/s3/putUrl';
const RESOURCE_PREFIX = 'v1/media';

function* uploadToS3(file, url) {
  try {
    yield uploadFile(file, url);
    return true;
  } catch (err) {
    return false;
  }
}


function* attemptToWriteExcelFile(payload) {
  try {
    const { data } = yield post(`${RESOURCE_PREFIX}/excel/write`, payload, true);
   console.log('[** attemp to write excel **',data);
    yield put(setMediaWriteExcelSucceed(payload));
    ;
  } catch (err) {
    const error = handleSagaError(err);
    yield put(setMediaWriteExcelFailure(error.debug));
    TOAST.error('Cannot process request.Please contact support');
  }
}

function* attemptToUploadFile({ payload }) {
  yield put(setMediaUploadStatus(ACTION_STATUSES.PENDING, payload.storeKey));
  if (payload.path === 'user') {
    try {

      // get signed url

      const { data: { putURL, getURL } } = yield get(`${AWS_S3_PREFIX}/${payload.category}/${payload.path}/${payload.filename}`, true);
      // upload to s3
      const file = yield uploadToS3(payload.file, putURL);
      if (!file) {
        yield put(setMediaUploadStatus(ACTION_STATUSES.FAILED, payload.storeKey));
        yield put(setMediaUploadError('FAILED_TO_UPLOAD_FILE'));
        TOAST.error('Failed to upload file');
        return;
      }
      yield put(setMediaUploadedUrl(getURL, 'upload'));
      yield put(setMediaUploadStatus(ACTION_STATUSES.SUCCEED, 'upload'));
      TOAST.ok('File uploaded successfully.');
    } catch (err) {
      const error = handleSagaError(err);
      yield put(setMediaUploadError(error.debug));
      yield put(setMediaUploadStatus(ACTION_STATUSES.FAILED, payload.storeKey));
      TOAST.error('Failed to upload file');
    }
  }
}


function* mediaSaga<T>(): Iterable<T> {
  yield takeLatest(MEDIA_ACTIONS.ATTEMPT_TO_UPLOAD_FILE, attemptToUploadFile);
  
  yield takeLatest(MEDIA_ACTIONS.ATTEMPT_TO_WRITE_EXCEL_FILE, attemptToWriteExcelFile);

}

export default mediaSaga;
