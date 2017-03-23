import React, { Component } from 'react';
// import classNames from 'classnames';
import styles from './fare.css';


export default class InputPIN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this._lastVal = '';
  }
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
            onChange={e => this._inputPin(e)}
            value={this.state.input}
            type="password"
            maxLength={6}
            pattern="[0-9]*"
          />
          <div>
            <a onClick={() => onCancel()}>Cancel</a>
            <span />
            <a onClick={() => onConfirm(this.state.input)}>Confirm</a>
          </div>
        </div>
      </div>
    )
  }
  _inputPin(e) {
    const val = e.target.value;
    if (val.match(/^[a-zA-Z]/gi)) return;
    this.setState({
      input: val
    });
    this._lastVal = val;
  }
}
