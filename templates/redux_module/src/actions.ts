import { ActionCreator } from 'redux';

import {
  ActionTypes,
  SaveDateOnClick,
} from './types';

export const saveDateOnClick: ActionCreator<SaveDateOnClick> = (dateStr) => ({
  result: dateStr,
  type: ActionTypes.SAVE_DATE_ON_CLICK,
});

export const callFakeAPI: ActionCreator<any> = () => ({
  type: ActionTypes.CALL_FAKE_API,
});

export const recordUser: ActionCreator<any> = (user) => ({
  result: user,
  type: ActionTypes.RECORD_USER,
});
