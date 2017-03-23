import React from 'react';
import styles from './fare.css';

const Toast = ({ title, onCancel }) => (
  <div className={styles.pinCode}>
    <div className={styles.pinWrap}>
      <p>{title}</p>
      <div>
        <a onClick={() => onCancel()}>Cancel</a>
      </div>
    </div>
  </div>
)


export default Toast;
