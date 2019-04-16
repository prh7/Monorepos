import { ActionCreators, Selectors } from 'package-template-redux-module';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import Component from './component';

const mapStateToProps = createStructuredSelector({
  dtmLastClick: Selectors.getDtmLastClick(),
  user: Selectors.getUser(),
});

export default connect(mapStateToProps, {
  callFakeAPI: ActionCreators.callFakeAPI,
  saveDateOnClick: ActionCreators.saveDateOnClick,
})(Component);
