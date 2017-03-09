import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import Payment from './containers/Payment';
import Home from './containers/Home';
import About from './containers/About';
import Home1 from './containers/Home/Home1';
import Home2 from './containers/Home/Home2';

import configure from './store';
import rootSaga from './sagas';

const store = configure();
store.runSaga(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Payment} />
      <Route path="home" component={Home} />
      <Route component={Home}>
        <Route path="home1/:id" component={Home1} />
        <Route path="home2/:id" component={Home2} />
      </Route>
      <Route path="about" component={About} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
