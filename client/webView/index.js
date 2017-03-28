import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

const errorLoading = err => (console.error('Dynamic page loading failed', err));

const loadRoute = cb => (module => cb(null, module.default));

const VisaCard = (location, cb) => {
  System.import('./containers/VisaCard').then(loadRoute(cb)).catch(errorLoading);
}
const TelFare = (location, cb) => {
  System.import('./containers/TelFare').then(loadRoute(cb)).catch(errorLoading);
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/visaCard" getComponent={VisaCard} />
    <Route path="/telfare" getComponent={TelFare} />
  </Router>,
  document.getElementById('app')
);
