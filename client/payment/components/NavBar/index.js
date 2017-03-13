import React from 'react';
import styles from './NavBar.css';

const NavBar = ({ title }) => (
  <header className={styles.header}>
    <a className={styles.arrowLeft}>pop</a>
    <h3>{title}</h3>
  </header>
)

export default NavBar;
