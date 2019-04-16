import { Action, ActionCreator, Store } from 'redux';

export interface State {
  dtmLastClick: string;
  user: any;
}

// Action Types (use @@context/ACTION_TYPE for better debugging experience)
export enum ActionTypes {
  SAVE_DATE_ON_CLICK = '@@HelloContainer/SAVE_DATE_ON_CLICK',
  CALL_FAKE_API = '@@HelloContainer/CALL_FAKE_API',
  RECORD_USER = '@@HelloContainer/RECORD_USER',
}

export interface SaveDateOnClick extends Action {
  type: ActionTypes.SAVE_DATE_ON_CLICK;
  result: string;
}

export interface CallFakeAPI extends Action {
  type: ActionTypes.CALL_FAKE_API;
}

export interface RecordUser extends Action {
  type: ActionTypes.RECORD_USER;
  result: any;
}

export type Actions = SaveDateOnClick | CallFakeAPI | RecordUser; // | OtherActions;

export interface ActionCreators {
  saveDateOnClick: ActionCreator<Actions>;
  callFakeAPI: ActionCreator<Actions>;
  recordUser: ActionCreator<Actions>;
  // otherActionCreator: ActionCreator<HelloActions>;
}
