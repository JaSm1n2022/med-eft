export const MEDIA_ACTIONS = {
    ATTEMPT_TO_UPLOAD_FILE: 'dashboard/@@MEDIA//ATTEMPT_TO_UPLOAD_FILE',
    SET_MEDIA_UPLOAD_ERROR: 'dashboard/@MEDIA/SET_MEDIA_UPLOAD_ERROR',
    SET_MEDIA_UPLOAD_STATUS: 'dashboard/@MEDIA/SET_MEDIA_UPLOAD_STATUS',
    SET_UPLOADED_S3_URL: 'dashboard/@MEDIA/SET_UPLOADED_S3_URL',
    RESET_UPLOAD_INITIAL_STATE :'dashboard/@MEDIA/RESET_UPLOAD_INITIAL_STATE',
  
    ATTEMPT_TO_WRITE_EXCEL_FILE: 'dashboard/@@MEDIA//ATTEMPT_TO_WRITE_EXCEL_FILE',
    SET_MEDIA_WRITE_EXCEL_FAILURE: 'dashboard/@MEDIA/SET_MEDIA_WRITE_EXCEL_FAILURE',
    SET_MEDIA_WRITE_EXCEL_SUCCEED: 'dashboard/@MEDIA/SET_MEDIA_WRITE_EXCEL_SUCCESS',
  
    ATTEMPT_TO_UPLOAD_USER_PHOTO: 'dashboard/@@MEDIA//ATTEMPT_TO_UPLOAD_USER_PHOTO',
    SET_UPLOAD_USER_PHOTO_ERROR: 'dashboard/@MEDIA/SET_UPLOAD_USER_PHOTO_ERROR',
    SET_UPLOAD_USER_PHOTO_STATUS: 'dashboard/@MEDIA/SET_UPLOAD_USER_PHOTO_STATUS',
    SET_UPLOADED_USER_PHOTO_S3_URL: 'dashboard/@MEDIA/SET_UPLOADED_USER_PHOTO_S3_URL',
    RESET_UPLOADED_USER_PHOTO_INITIAL_STATE :'dashboard/@MEDIA/RESET_UPLOADED_USER_PHOTO_INITIAL_STATE',
  
  
  
  };
  
  /* ACTION CREATORS */
  
  /**
   * action creator
  
   * @returns {Object} - action
   */
  
  export const attemptToWriteExcelFile =  (data: Object): BaseAction  => ({
    type: MEDIA_ACTIONS.ATTEMPT_TO_WRITE_EXCEL_FILE,
    payload: data
  });
  
  /**
   * action creator
   * @param {String} status -
   * @param {String} storeKey - specific key for the file
   * @param {Array<Object>} data -
   * @returns {Object} - action
   */
  export const setMediaWriteExcelSucceed = (payload: Object): BaseAction => ({
    type: MEDIA_ACTIONS.SET_MEDIA_WRITE_EXCEL_SUCCEED,
    payload
  });
  
  
  /**
   * action creator
   * @param {String} error -
   * @param {String} storeKey -
   * @returns {Object} - action
   */
  export const setMediaWriteExcelFailure = (payload: Object): BaseAction => ({
    type: MEDIA_ACTIONS.SET_MEDIA_WRITE_EXCEL_FAILURE,
    payload
  });
  
  export const attemptToUploadFile = (data: Object): BaseAction => ({
    type: MEDIA_ACTIONS.ATTEMPT_TO_UPLOAD_FILE,
    payload: data
  });
  
  /**
   * action creator
   * @param {String} error -
   * @param {String} storeKey -
   * @returns {Object} - action
   */
  export const setMediaUploadError = (payload: Object): BaseAction => ({
    type: MEDIA_ACTIONS.SET_MEDIA_UPLOAD_ERROR,
    payload
  });
  
  /**
   * action creator
   * @param {String} status -
   * @param {String} storeKey - specific key for the file
   * @returns {Object} - action
   */
  export const setMediaUploadStatus = (payload: Object): BaseAction => ({
    type: MEDIA_ACTIONS.SET_MEDIA_UPLOAD_STATUS,
    payload
  });
  /**
 * action creator
 * @param {String} path - s3 url
 * @param {String} storeKey - specific key for the file
 * @returns {Object} - action
 */
export const setMediaUploadedUrl = (path, storeKey): BaseAction => ({
    type: MEDIA_ACTIONS.SET_UPLOADED_S3_URL,
    payload: { path, storeKey }
  });
  export const resetMediaUploadedUrl = (storeKey): BaseAction => ({
    type: MEDIA_ACTIONS.RESET_UPLOAD_INITIAL_STATE,
    payload: { storeKey }
  });


 //user photo
 export const attemptToUploadUserPhoto = (data: Object): BaseAction => ({
  type: MEDIA_ACTIONS.ATTEMPT_TO_UPLOAD_USER_PHOTO,
  payload: data
});

/**
 * action creator
 * @param {String} error -
 * @param {String} storeKey -
 * @returns {Object} - action
 */
export const setUploadUserPhotoError = (payload: Object): BaseAction => ({
  type: MEDIA_ACTIONS.SET_UPLOAD_USER_PHOTO_ERROR,
  payload
});

/**
 * action creator
 * @param {String} status -
 * @param {String} storeKey - specific key for the file
 * @returns {Object} - action
 */
export const setUploadUserPhotoStatus = (payload: Object): BaseAction => ({
  type: MEDIA_ACTIONS.SET_UPLOAD_USER_PHOTO_STATUS,
  payload
});
/**
* action creator
* @param {String} path - s3 url
* @param {String} storeKey - specific key for the file
* @returns {Object} - action
*/
export const setUploadedUserPhotoUrl = (path, storeKey): BaseAction => ({
  type: MEDIA_ACTIONS.SET_UPLOADED_USER_PHOTO_S3_URL,
  payload: { path, storeKey }
});
export const resetUploadUserPhotoUrl = (storeKey): BaseAction => ({
  type: MEDIA_ACTIONS.RESET_UPLOADED_USER_PHOTO_INITIAL_STATE,
  payload: { storeKey }
});
