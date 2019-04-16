import * as actions from '../actions';
import { ActionTypes } from '../types';
​
describe('actions', () => {
  it('should create an action to indicate when user last clicked', () => {
    const result = new Date().toISOString();
    const expectedAction = {
      result,
      type: ActionTypes.SAVE_DATE_ON_CLICK,
    };
    expect(actions.saveDateOnClick(result)).toEqual(expectedAction);
  });
});
