import React, { Component } from 'react';
// import classNames from 'classnames';
import styles from './fare.css';


export default class InputPIN extends Component {
  componentDidMount() {
    this.input.focus();
  }
  render() {
    const { title, onConfirm, onCancel } = this.props;
    return (
      <div className={styles.pinCode}>
        <div className={styles.pinWrap}>
          <p>{title}</p>
          <input
            ref={input => (this.input = input)}
            type="password"
            maxLength={6}
            pattern="[0-9]*"
          />
          <div>
            <button onClick={() => onCancel()}>Cancel</button>
            <span />
            <button onClick={() => onConfirm(this.input.value)}>Confirm</button>
          </div>
        </div>
      </div>
    )
  }
}
