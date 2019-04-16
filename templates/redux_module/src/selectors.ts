import { createSelector } from 'reselect';

const selectExampleReduxModule = (state: any) => state.exampleReduxModule || state;

export const getDtmLastClick = () =>
  createSelector(selectExampleReduxModule, exampleReduxModuleState => exampleReduxModuleState.dtmLastClick);

export const getUser = () =>
  createSelector(selectExampleReduxModule, exampleReduxModuleState => exampleReduxModuleState.user);
