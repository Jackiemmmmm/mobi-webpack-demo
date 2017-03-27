import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import styles from './layout.css';

const NavTitle = function(pathname) {
  switch (pathname) {
    case '/deposit':
      return 'Deposit';
    case '/newRecipient':
      return 'New Recipient';
    case '/profile':
      return 'My Profile';
    case '/history':
      return 'Transfer History';
    default:
      return 'Withdraw';
  }
}

export default class Layout extends Component {
  render() {
    const pathname = NavTitle(this.props.location.pathname);
    return (
      <div style={styles.wrapper}>
        <NavBar title={pathname} pop={() => this._backToNative()} />
        {this.props.children}
      </div>
    )
  }
  _backToNative() {
    // native go back method
    if (window.JSInterface) {
      return window.JSInterface.toFinish();
    }
    return browserHistory.goBack();
  }
}
