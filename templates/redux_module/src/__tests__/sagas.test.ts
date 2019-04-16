import { delay } from 'redux-saga';
import { fetchData, getUserData } from '../sagas';

describe('sagas', () => {
  it('should fetch the user after a slight delay', () => {

    const gen = fetchData();

    expect(gen.next().value).resolves.toEqual(delay(1500));

    const user = {
      gender: 'Male',
      name: 'John Doe',
    };

    // To-do
    gen.next();
  });
});
