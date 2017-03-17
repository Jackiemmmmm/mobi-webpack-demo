import React from 'react';
import { browserHistory } from 'react-router';
import styles from './NavBar.css';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';

const isShow = () => {
  switch (window.location.pathname) {
    case '/':
    case '/withdraw':
    case '/deposit':
      return false;
    case '/telFare':
      return true;
    default:
      return true;
  }
}

const NavBar = ({ title, pop }) => (
  <header className={styles.header}>
    {isShow() &&
      <a
        onClick={() => (pop ? pop() : browserHistory.goBack())}
        className={styles.arrowLeft}
      ><ArrowLeftIcon /></a>}
    <h3>{title}</h3>
  </header>
)

export default NavBar;
