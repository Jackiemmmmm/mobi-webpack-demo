import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import classNames from 'classnames';
import styles from './fare.css';
import { formatPrice } from '../../../common/utlis/format';
import DeleteIcon from '../../../common/icons/DeleteIcon';
import FareItem from './FareItem';
import InputPIN from './InputPIN';
import Toast from './Toast';

class TelFare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '',
      canBuy: [30, 50, 100, 200, 300, 500],
      chose: 0,
      price: 30,
      type: '',
      isShow: true,
      hideInputPIN: true,
      hideToast: true,
      toastTitle: '',
      loading: false,
    }
    this.lastVal = '';
    this.input = null;
  }
  componentWillMount() {
    if (window.JSInterface) {
      this._testAvailable = window.JSInterface.getRmbBalance();
      const getPhoneNum = window.JSInterface.getPhoneNum();
      this._formatPhone(getPhoneNum, newVal => (
        this._changeState('tel', newVal)
      ))
      this._checkCompany(getPhoneNum);
    }
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    const telLength = this.state.tel.length
    return (
      <div>
        <div className={styles.inputNumber}>
          <label htmlFor="tel">
            +86
            <input
              ref={e => (this.input = e)}
              id="tel"
              type="tel"
              name="phone"
              onChange={event => this._change(event)}
              value={this.state.tel}
              placeholder={this._fromNativeNumber}
              maxLength={13}
              pattern="[0-9]*"
            />
          </label>
          <span>{telLength === 13 && (this.state.type !== '' ? this.state.type : 'loading...')}</span>
          {telLength > 0 && <a onClick={() => { this._changeState('clearTel'); this.input.focus(); }}><DeleteIcon /></a>}
        </div>
        <h3 className={styles.mobileTitle}>Mobile Top Up</h3>
        <div className={styles.priceWrap}>
          {this.state.canBuy.map((price, idx) =>
            <FareItem
              key={price}
              price={price}
              checkIndex={() => this._changeState('choseItem', [idx, price])}
              chose={this.state.chose === idx}
            />) }
        </div>
        <div className={styles.total}>
          <p>Total Balance <span>{formatPrice(this._testAvailable) }</span></p>
        </div>
        <button
          className={classNames(styles.btn,
            (telLength !== 13 || !this.state.isShow) && styles.unClick)}
          onClick={() => this._submitFare()}
        >
          Top Up
        </button>
        {!this.state.hideInputPIN && <InputPIN
          title={'Please Enter Mobi PIN'}
          onConfirm={num => this._changeState('submitFare', num)}
          onCancel={() => this._changeState('hideInputPIN')}
        />}
        {!this.state.hideToast && <Toast title={this.state.toastTitle} onCancel={() => this._changeState('hideToast')} />}
      </div>
    )
  }
  _changeState(name, args) {
    const set = obj => (this.setState(obj))
    switch (name) {
      case 'tel':
        return set({ tel: args })
      case 'choseItem':
        return set({ chose: args[0], price: args[1] })
      case 'clearTel':
        return set({ tel: '' });
      case 'submitFare':
        return set({ num: args, hideInputPIN: true })
      case 'hideInputPIN':
        return set({ hideInputPIN: true });
      case 'hideToast':
        return set({ hideToast: true });
      case 'fetchComponySuccess':
        return set({ type: args, isShow: true });
      case 'fetchComponyFail':
        return set({ type: '输入信息有误', isShow: true });
      case 'formatPhone':
        return set({ tel: args, type: '', isShow: false });
      case 'toast':
        return set({ toastTitle: args, hideToast: false });
      case 'fetchComponyError':
        return set({ toastTitle: args, hideToast: false, type: '输入信息有误', isShow: true });
      default:
        break;
    }
  }
  _checkCompany(tel) {
    const body = JSON.stringify({ phoneNum: tel });
    const headers = {
      'Content-Type': 'application/json',
    }
    this._changeState('loading', true);
    this.fetchData('http://10.0.20.227:3000/area', 'POST', body, headers).then((res) => {
      res.text().then((resolve) => {
        const resp = JSON.parse(resolve);
        if (resp.status === 'success' && resp.message) {
          this._changeState('fetchComponySuccess', resp.message.type.replace('中国', resp.message.province))
        } else {
          this._changeState('fetchComponyFail')
        }
      });
    }).catch((err) => {
      console.log(err);
      this._changeState('fetchComponyError', '验证手机号失败');
    })
  }
  _change(event) {
    const eventTarget = event.target.value;
    const fromatEvent = eventTarget.replace(/\s/g, '');

    if (eventTarget.length === 13) {
      this._changeState('tel', eventTarget);
      if (eventTarget !== this.lastVal) this._checkCompany(fromatEvent);
      this.lastVal = eventTarget;
      return;
    }
    this._formatPhone(fromatEvent, newVal => (
      this._changeState('formatPhone', newVal)
    ));
  }
  _formatPhone(val, newVal) {
    const a = val.substring(0, 3);
    const b = val.substring(3, 7);
    const c = val.substring(7, 11);
    if (a && b && c) {
      return newVal(`${a} ${b} ${c}`);
    } else if (a && b) {
      return newVal(`${a} ${b}`);
    }
    newVal(`${a}`);
  }
  _submitFare() {
    if (this.state.tel.length !== 13) return this._changeState('toast', '请输入正确的电话号码');
    if (this.state.price === null) return this._changeState('toast', '请选择价格');
    if (!this.state.isShow) return this._changeState('toast', '请输入正确信息');
    this._checkPin();
  }
  _checkPin() {
    fetch('https://staging-wallet-api.btcc.com/v2/cash/mobile_topup', {
      method: 'POST',
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL21vYmkubWUiLCJleHAiOjE0OTI3NTM1NDEsImlhdCI6MTQ5MDE2MTU0MSwicGljYXNzb19qd3QiOnsiX2lkIjoiYTQxYTk0NzA4NDBkNGQwNjgyN2JlZTMyYjMwZDlhMmQifX0.6Lyqp0fBcPTPptTzmDTZGErSZfTJDWSUZCwU9Us3kNk',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'amount=5000000000&mobile=18817870535&pin=d4913ba2f5141ba5229fd0d255f31432'
    }).then((resp) => {
      resp.text().then((resolve) => {
        const response = JSON.parse(resolve);
        if (response.ret === 1) {
          this._changeState('toast', 'Mobile top up sent!');
        } else {
          this._changeState('toast', 'something be wrong');
        }
      });
    }).catch(() => (this._changeState('toast', 'Internet to connect')))
  }
  fetchData(url, method, body, headers) {
    return fetch(url, { method, headers, body })
  }
}

export default TelFare;
