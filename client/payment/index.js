import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import Payment from './containers/Payment';

import configure from './store';
import rootSaga from './sagas';

const store = configure();
store.runSaga(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Payment />
  </Provider>,
  document.getElementById('app')
);
