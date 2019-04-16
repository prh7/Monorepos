import { reducer } from '../reducer';
import { Actions } from '../types';
​
describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as Actions)).toEqual(
      {
        dtmLastClick: 'NEVER',
        user: null,
      },
    );
  });
});
