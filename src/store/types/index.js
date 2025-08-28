// @flow

export type BaseAction = {
  type: string,
  payload: ?any
};

export type ImsState = {
  medicaid: {
    data: ?Object,
    error: ?string,
    status: ?string
  },
  medicare : {

    data: ?Object,
    error: ?string,
    status: ?string
  }

};

export type MediaUploadState = {
  error: ?string,
  status: ?string,
  s3_url: ?string
};
export type MediaUserPhotoState = {
  error: ?string,
  status: ?string,
  userPhoto_url: ?string
};


export type MediaExcelState = {
  excel: {
    data: ?Object,
    error: ?string,
    status: ?string
  },
}
export type MediaPdfState = {
  pdf: {
    data: ?Object,
    error: ?string,
    status: ?string
  }
}


