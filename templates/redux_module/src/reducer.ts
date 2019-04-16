import { Reducer } from 'redux';
import {
  Actions,
  ActionTypes,
  State,
} from './types';

export const initialState: State = {
  dtmLastClick: 'NEVER',
  user: null,
};

export const reducer: Reducer<State> = (
  state: State = initialState,
  action: Actions,
) => {
  switch (action.type) {
    case ActionTypes.SAVE_DATE_ON_CLICK:
      return { ...state, dtmLastClick: action.result };

    case ActionTypes.RECORD_USER: {
      // Record some user data
      const { result } = action;
      return Object.assign(
        {},
        state,
        { user: `NAME: ${result.name} GENDER: ${result.gender}` },
      );
    }
    default:
      return state;
  }
};

export const reducer1: Reducer<any> = (
  state: any = {
    hardcoded: 'not dynamic',
  },
  action: Actions,
) => {
  switch (action.type) {
    default:
      return state;
  }
};
