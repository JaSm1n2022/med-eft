import { createSelector } from 'reselect';

const getImsReducer = (state) => state.ims;

export const medicaidStateSelector = createSelector(
  getImsReducer, data => data.medicaid
);
export const medicareStateSelector = createSelector(
  getImsReducer, data => data.medicare
);