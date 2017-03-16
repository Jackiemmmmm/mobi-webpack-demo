import React from 'react';
import { browserHistory } from 'react-router';
import styles from './NavBar.css';

const goBack = () => (
  window.location.pathname !== '/' && window.location.pathname !== '/withdraw' && window.location.pathname !== '/deposit' && window.location.pathname !== '/telFare'
)

const NavBar = ({ title }) => (
  <header className={styles.header}>
    {goBack() && <a onClick={() => browserHistory.goBack()} className={styles.arrowLeft}>pop</a>}
    <h3>{title}</h3>
  </header>
)

export default NavBar;
