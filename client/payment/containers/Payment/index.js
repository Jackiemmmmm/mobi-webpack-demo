import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './PaymentCss.less';
// import message from './message.json';

export default class Payment extends Component {
  render() {
    return (
      <div className={styles.cardWarrper}>
        <Link to="/home" >home</Link>
      </div>
    )
  }
}