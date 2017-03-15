import React from 'react';
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
      return 'Transfer History'
    default:
      return 'Withdraw';
  }
}

const Layout = function(props) {
  const pathname = NavTitle(props.location.pathname);
  return (
    <div style={styles.wrapper}>
      <NavBar title={pathname} />
      {props.children}
    </div>
  )
}

export default Layout;
