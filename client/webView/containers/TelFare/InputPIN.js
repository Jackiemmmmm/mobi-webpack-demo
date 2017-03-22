import React from 'react';
// import classNames from 'classnames';
import styles from './fare.css';

const InputPIN = ({ title, onConfirm, onCancel }) => {
  let val = null;
  return (
    <div className={styles.pinCode}>
      <div className={styles.pinWrap}>
        <p>{title}</p>
        <input
          type="number"
          name="inputPIN"
          maxLength={13}
          ref={input => (val = input)}
        />
        <div>
          <button onClick={() => onCancel()}>Cancel</button>
          <span />
          <button onClick={() => onConfirm(val.value)}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default InputPIN;
