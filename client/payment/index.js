import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Withdraw from './containers/Withdraw';
import ErrorPage from './containers/ErrorPage';
import WithdrawSend from './containers/WithdrawSend';
import Recipient from './containers/Recipient';
import Profile from './containers/Profile';
import TransferHistory from './containers/TransferHistory';
import Layout from './components/Layout';

import configure from './store';

const store = configure();
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} >
        <IndexRoute component={Withdraw} />
        <Route path="/withdraw" component={Withdraw} />
        <Route path="/deposit" component={Withdraw} />
        <Route path="/newRecipient" component={Recipient} />
        <Route path="/profile" component={Profile} />
        <Route path="/history" component={TransferHistory} />
        <Route path="/:name" component={WithdrawSend} />
      </Route>
      <Route path="*" component={ErrorPage} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
