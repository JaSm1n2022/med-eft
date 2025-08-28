export const IMS_ACTIONS = {
ATTEMPT_TO_PARSE_MEDICAID: 'dashboard/@IMS/ATTEMPT_TO_PARSE_MEDICAID',
SET_PARSE_MEDICAID_SUCCEED: 'dashboard/@IMS/SET_PARSE_MEDICAID_SUCCEED',
SET_PARSE_MEDICAID_FAILURE: 'dashboard/@IMS/SET_PARSE_MEDICAID_FAILURE',
RESET_PARSE_MEDICAID_STATE: 'dashboard/@IMS/RESET_PARSE_MEDICAID_STATE',

ATTEMPT_TO_PARSE_MEDICARE: 'dashboard/@IMS/ATTEMPT_TO_PARSE_MEDICARE',
SET_PARSE_MEDICARE_SUCCEED: 'dashboard/@IMS/SET_PARSE_MEDICARE_SUCCEED',
SET_PARSE_MEDICARE_FAILURE: 'dashboard/@IMS/SET_PARSE_MEDICARE_FAILURE',
RESET_PARSE_MEDICARE_STATE: 'dashboard/@IMS/RESET_PARSE_MEDICARE_STATE'


}
//IMS MEDICAID

export const attemptToParseMedicaid =  (data: Object): BaseAction  => ({
    type: IMS_ACTIONS.ATTEMPT_TO_PARSE_MEDICAID,
    payload: data
  });
  export const setParseMedicaidSucceed = (payload: Object): BaseAction => ({
    type: IMS_ACTIONS.SET_PARSE_MEDICAID_SUCCEED,
    payload
  });
  
  export const setParseMedicaidFailure = (payload: Object): BaseAction => ({
    type: IMS_ACTIONS.SET_PARSE_MEDICAID_FAILURE,
    payload
  });
  export const resetParseMedicaidState = (): BaseAction => ({
    type: IMS_ACTIONS.RESET_PARSE_MEDICAID_STATE
  });


//IMS MEDICARE

export const attemptToParseMedicare =  (data: Object): BaseAction  => ({
  type: IMS_ACTIONS.ATTEMPT_TO_PARSE_MEDICARE,
  payload: data
});
export const setParseMedicareSucceed = (payload: Object): BaseAction => ({
  type: IMS_ACTIONS.SET_PARSE_MEDICARE_SUCCEED,
  payload
});

export const setParseMedicareFailure = (payload: Object): BaseAction => ({
  type: IMS_ACTIONS.SET_PARSE_MEDICARE_FAILURE,
  payload
});
export const resetParseMedicareState = (): BaseAction => ({
  type: IMS_ACTIONS.RESET_PARSE_MEDICARE_STATE
});
