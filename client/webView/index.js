import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import VisaCard from './containers/VisaCard';
import TelFare from './containers/TelFare';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/visaCard" component={VisaCard} />
    <Route path="/telfare" component={TelFare} />
  </Router>,
  document.getElementById('app')
);
