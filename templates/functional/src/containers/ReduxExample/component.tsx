import * as React from 'react';
import { ReduxExample } from '../../components';
import { ReduxExampleProps } from './types';

const Component: React.SFC<ReduxExampleProps> = ({ callFakeAPI, saveDateOnClick, dtmLastClick, user }) => {
  return (
    <div id="redux-example">
      <h1>Dispatch action on click</h1>
      <ReduxExample
        handleClick={saveDateOnClick}
      >
        <b>Hello</b>
        <br/>
        <span>According to Redux, the last time you clicked the button below was...</span>
        {dtmLastClick}
      </ReduxExample>

      <ReduxExample
        handleClick={callFakeAPI}
      >
        <span>Try to fetch a user from a fake API using redux-saga</span>
        {user}
      </ReduxExample>
    </div>
  );
};

export default Component;
