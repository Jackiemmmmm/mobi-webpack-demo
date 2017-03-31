import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import ErrorPage from './containers/ErrorPage';
import Layout from './components/Layout';

import configure from './store';

const store = configure();

const errorLoading = err => (console.error('Dynamic page loading failed', err));

const loadRoute = cb => (module => cb(null, module.default));

const Withdraw = (location, cb) => {
  System.import('./containers/Withdraw').then(loadRoute(cb)).catch(errorLoading);
}
const WithdrawSend = (location, cb) => {
  System.import('./containers/WithdrawSend').then(loadRoute(cb)).catch(errorLoading);
}
const Recipient = (location, cb) => {
  System.import('./containers/Recipient').then(loadRoute(cb)).catch(errorLoading);
}
const Profile = (location, cb) => {
  System.import('./containers/Profile').then(loadRoute(cb)).catch(errorLoading);
}
const TransferHistory = (location, cb) => {
  System.import('./containers/TransferHistory').then(loadRoute(cb)).catch(errorLoading);
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} >
        <IndexRoute getComponent={Profile} />
        <Route path="/profile" getComponent={Profile} />
        <Route path="/withdraw" getComponent={Withdraw} />
        <Route path="/deposit" getComponent={Withdraw} />
        <Route path="/newRecipient" getComponent={Recipient} />
        <Route path="/history" getComponent={TransferHistory} />
        <Route path="/withdrawSend" getComponent={WithdrawSend} />
      </Route>
      <Route path="*" component={ErrorPage} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
