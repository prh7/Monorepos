import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { recordUser } from './actions';
import { ActionTypes } from './types';

// Create a saga

export function* rootSaga() {
  // Catch all actions with type CALL_FAKE_API
  // takeLatest will only take the last action type CALL_FAKE_API and
  // the others that were not completed before the latest
  // will be cancelled
  yield takeLatest(ActionTypes.CALL_FAKE_API, fetchData);
}

// Declare some function that would return some data
// This can be an Api Call
export const getUserData = () => {
  return {
    gender: 'Male',
    name: 'John Doe',
  };
};

// Function to be called by saga taking action CALL_FAKE_API
export function* fetchData() {
  // Simulate some server delay
  yield delay(1500);
  // Call a function
  // redux-saga "call" effect allows you to call a function
  const result = yield call(getUserData);
  yield put(recordUser(result));
}
