import { MEDIA_ACTIONS } from '../actions/mediaAction';
import { ACTION_STATUSES } from '../../utils/constants';
import type { BaseAction } from '../types/Action';
import type { MediaExcelState } from '../types';

type MediaState = {
   upload: MediaUploadState,
   excel: MediaExcelState
};

const initialUploadState = (): MediaUploadState => ({

  status: null,
  error: null,
  s3_url: null
  // data: null,
  // newProperty: null
});

const initialState = (): MediaState => ({
  upload: initialUploadState(),
  excel: initialExcelState()
});

const initialExcelState = (): MediaExcelState => ({

  excel: {
    data: {},
    status: null,
    error: null
  }
});
// Reducers

/*
Shipment 
 */
const ATTEMPT_TO_WRITE_EXCEL_FILE = (state: ShipmentState) => ({
  ...state,
  excel: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_MEDIA_WRITE_EXCEL_SUCCEED = (state: ShipmentState, action: BaseAction) => ({
  ...state,
  excel: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_MEDIA_WRITE_EXCEL_FAILURE = (state: ShipmentState) => ({
  ...state,
  excel: {
    ...state.excel,
    status: ACTION_STATUSES.FAILED
  }
});

/**
 * SET_MEDIA_UPLOAD_ERROR Reducer
 * @param {MediaState} state - state object
 * @param {BaseAction} action - action object
 * @returns {Object} - new state
 */
const SET_MEDIA_UPLOAD_ERROR = (state: MediaState, action: BaseAction) => {
    const uploadKey = action && action.payload && action.payload.storeKey ? action.payload.storeKey : 'upload';
 return {
    ...state,
    [uploadKey]: {
      ...state[uploadKey],
      error: action && action.payload && action.payload.error ? action.payload.error : ''
    }
  };
};

/**
 * SET_MEDIA_UPLOAD_STATUS Reducer
 * @param {MediaState} state - state object
 * @param {BaseAction} action - action object
 * @returns {Object} - new state
 */
const SET_MEDIA_UPLOAD_STATUS = (state: MediaState, action: BaseAction) => {
  const uploadKey = action && action.payload && action.payload.storeKey ? action.payload.storeKey : 'upload';
  return {
    ...state,
    [uploadKey]: {
      ...state[uploadKey],
      status: action && action.payload
    }
  };
};
const RESET_UPLOAD_INITIAL_STATE = (state, action) => {
  const uploadKey = action && action.payload && action.payload.storeKey ? action.payload.storeKey : 'upload';
 
  return {
    ...state,
    [uploadKey]: initialUploadState()
  };
};

/**
 * SET_UPLOADED_S3_URL Reducer
 * @param {MediaState} state - state object
 * @param {BaseAction} action - action object
 * @returns {Object} - new state
 */
const SET_UPLOADED_S3_URL = (state: MediaState, action: BaseAction) => {
    const uploadKey = action && action.payload && action.payload.storeKey ? action.payload.storeKey : 'upload';
  
    return {
      ...state,
      [uploadKey]: {
        ...state[uploadKey],
        s3_url: action && action.payload && action.payload.path ? action.payload.path : ''
    
      }
    };
  };
export default (state: MediaState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case MEDIA_ACTIONS.SET_MEDIA_UPLOAD_STATUS:
      return SET_MEDIA_UPLOAD_STATUS(state, action);
    case MEDIA_ACTIONS.SET_MEDIA_UPLOAD_ERROR:
      return SET_MEDIA_UPLOAD_ERROR(state, action);
      case MEDIA_ACTIONS.SET_UPLOADED_S3_URL:
      return SET_UPLOADED_S3_URL(state, action);
      case MEDIA_ACTIONS.RESET_UPLOAD_INITIAL_STATE:
      return RESET_UPLOAD_INITIAL_STATE(state, action);


      case MEDIA_ACTIONS.ATTEMPT_TO_WRITE_EXCEL_FILE:
      return ATTEMPT_TO_WRITE_EXCEL_FILE(state);
    case MEDIA_ACTIONS.SET_MEDIA_WRITE_EXCEL_SUCCEED:
      return SET_MEDIA_WRITE_EXCEL_SUCCEED(state, action);
    case MEDIA_ACTIONS.SET_MEDIA_WRITE_EXCEL_FAILURE:
      return SET_MEDIA_WRITE_EXCEL_FAILURE(state);
    default:
      return state;
  }
};
