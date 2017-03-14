import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import Withdraw from './containers/Widthdraw';
import ErrorPage from './containers/ErrorPage';
import WithdrawSend from './containers/WithdrawSend';

import configure from './store';
import rootSaga from './sagas';

const store = configure();
store.runSaga(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/widthdraw" component={Withdraw} />
      <Route path="/widthdraw:title" component={WithdrawSend} />
      <Route path="/deposit" component={Withdraw} />
      <Route path="*" component={ErrorPage} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
