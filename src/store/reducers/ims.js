import type { BaseAction } from '../types/Action';
import type { ImsState } from '../types';
import { IMS_ACTIONS } from '../actions/imsAction';
import { ACTION_STATUSES } from '../../utils/constants';

const initialState = (): ImsState => ({

  medicaid: {
    data: {},
    status: null,
    error: null
  },
  medicare : {
    data: {},
    status: null,
    error: null

  }
});


/*
Medicaid
 */
const ATTEMPT_TO_PARSE_MEDICAID = (state: ImsState) => ({
  ...state,
  medicaid: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_PARSE_MEDICAID_SUCCEED = (state: ImsState, action: BaseAction) => ({
  ...state,
  medicaid: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_PARSE_MEDICAID_FAILURE = (state: ImsState) => ({
  ...state,
 medicaid: {
    ...state.medicaid,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_PARSE_MEDICAID_STATE = (state: ImsState) => ({
  ...state,
  medicaid: initialState().medicaid
});


/*
Medicare
 */
const ATTEMPT_TO_PARSE_MEDICARE = (state: ImsState) => ({
  ...state,
  medicare: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_PARSE_MEDICARE_SUCCEED = (state: ImsState, action: BaseAction) => ({
  ...state,
  medicare: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_PARSE_MEDICARE_FAILURE = (state: ImsState) => ({
  ...state,
 medicare: {
    ...state.medicare,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_PARSE_MEDICARE_STATE = (state: ImsState) => ({
  ...state,
  medicare: initialState().medicare
});


const reducer = (state: ImsState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case IMS_ACTIONS.ATTEMPT_TO_PARSE_MEDICAID:
      return ATTEMPT_TO_PARSE_MEDICAID(state);
    case IMS_ACTIONS.SET_PARSE_MEDICAID_SUCCEED:
      return SET_PARSE_MEDICAID_SUCCEED(state, action);
    case IMS_ACTIONS.SET_PARSE_MEDICAID_FAILURE:
      return SET_PARSE_MEDICAID_FAILURE(state);
    case IMS_ACTIONS.RESET_PARSE_MEDICAID_STATE:
      return RESET_PARSE_MEDICAID_STATE(state);

      case IMS_ACTIONS.ATTEMPT_TO_PARSE_MEDICARE:
        return ATTEMPT_TO_PARSE_MEDICARE(state);
      case IMS_ACTIONS.SET_PARSE_MEDICARE_SUCCEED:
        return SET_PARSE_MEDICARE_SUCCEED(state, action);
      case IMS_ACTIONS.SET_PARSE_MEDICARE_FAILURE:
        return SET_PARSE_MEDICARE_FAILURE(state);
      case IMS_ACTIONS.RESET_PARSE_MEDICARE_STATE:
        return RESET_PARSE_MEDICARE_STATE(state);

    default:
      return state;
  }
};

export default reducer;
