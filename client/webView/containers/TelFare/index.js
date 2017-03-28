import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import classNames from 'classnames';
import sha256 from 'js-sha256';
import md5 from 'js-md5';
import styles from './fare.css';
import { formatPrice } from '../../../common/utlis/format';
import DeleteIcon from '../../../common/icons/DeleteIcon';
import FareItem from './FareItem';
import InputPIN from './InputPIN';
import Toast from './Toast';
import ArrowLeftIcon from '../../../common/icons/ArrowLeftIcon';

class TelFare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '',
      canBuy: [30, 50, 100, 200, 300, 500],
      chose: 1,
      price: 50,
      type: '',
      isShow: true,
      showInputPIN: false,
      hideToast: true,
      toastTitle: '',
      loading: false,
      allLoading: false,
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
        <header className={styles.header}>
          <a
            onClick={() => (window.JSInterface && window.JSInterface.toFinish())}
            className={styles.arrowLeft}
          ><ArrowLeftIcon /></a>
          <h3>Mobi Pop Up</h3>
        </header>
        <div className={styles.inputNumber}>
          <label htmlFor="tel">
            +86
            <input
              ref={e => (this.input = e)}
              id="tel"
              type="tel"
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
            />)}
        </div>
        <div className={styles.total}>
          <p>Total Balance <span>{formatPrice(this._testAvailable)}</span></p>
        </div>
        <button
          className={classNames(styles.btn,
            (telLength !== 13 || this.state.type === '请输入正确手机号码') && styles.unClick)}
          onClick={() => this._addPin()}
        >
          Top Up
        </button>
        {this.state.showInputPIN && <InputPIN
          title={'Please Enter Mobi PIN'}
          onConfirm={num => this._submitFare(num)}
          onCancel={() => this._changeState('hideInputPIN')}
        />}
        {!this.state.hideToast && <Toast title={this.state.toastTitle} onCancel={() => this._changeState('hideToast')} />}
        {this.state.allLoading && <div style={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0,0, 0.3)', justifyContent: 'center', alignItems: 'center', display: 'flex', color: 'white', fontSize: '1.5rem' }}>loading...</div>}
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
      case 'showInputPIN':
        return set({ showInputPIN: true });
      case 'hideInputPIN':
        if (args) return set({ showInputPIN: false, allLoading: args });
        return set({ showInputPIN: false });
      case 'hideToast':
        return set({ hideToast: true });
      case 'fetchComponySuccess':
        return set({ type: args, isShow: true });
      case 'fetchComponyFail':
        return set({ type: '请输入正确手机号码', isShow: true });
      case 'fetchComponyError':
        return set({ toastTitle: args, hideToast: false, type: '请输入正确手机号码', isShow: true });
      case 'formatPhone':
        return set({ tel: args, type: '', isShow: false });
      case 'toast':
        return set({ toastTitle: args, hideToast: false, allLoading: false });
      default:
        break;
    }
  }
  _checkCompany(tel) {
    const body = JSON.stringify({ phoneNum: tel });
    const headers = {
      'Content-Type': 'application/json',
    }
    this.fetchData('http://10.0.20.227:3000/area', 'POST', body, headers).then((res) => {
      res.text().then((resolve) => {
        const resp = JSON.parse(resolve);
        if (resp.status === 'success' && resp.message) {
          this._changeState('fetchComponySuccess', resp.message.type.replace('中国', resp.message.province));
        } else {
          this._changeState('fetchComponyFail');
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
    if (eventTarget.length === 13 && this.lastVal.length === 13) return;
    if (eventTarget.length === 13) this._checkCompany(fromatEvent);
    this._formatPhone(fromatEvent, (newVal) => {
      this._changeState('formatPhone', newVal);
      this.lastVal = newVal;
    });
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
  _addPin() {
    if (this.state.tel.length !== 13) return;
    if (this.state.price === null) return;
    if (this.state.type === '请输入正确手机号码') return;
    this._changeState('showInputPIN')
  }
  _submitFare(pin) {
    if (pin.length !== 6) return this._changeState('toast', '请输入6位Pin号');
    const pinString = pin.split('');
    let sHashPin = '';
    for (let i = 0; i < pinString.length; i += 1) {
      const s = x => (x.charCodeAt(0));
      const h = (parseFloat(pinString[i]) + i).toString().split('').map(s);
      const t = h.join('').split('').map(s)
      sHashPin += sha256.hex(t) + h.join('');
    }
    const newPin = md5.hex(sHashPin + pinString.join(''));
    this._changeState('hideInputPIN', true);
    const queryString = params => (`${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`);
    fetch('https://staging-wallet-api.btcc.com/v2/cash/mobile_topup', {
      method: 'POST',
      headers: {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL21vYmkubWUiLCJwaWNhc3NvX2p3dCI6eyJfaWQiOiI0ODUzNTQyZGRmMjM0ZmQyODQ2NDYwMzc0NmE1OWQ3ZCJ9LCJleHAiOjE0OTI4NDMyOTcsImlhdCI6MTQ5MDI1MTI5N30.VKY11ZbbG2LGygjvCMF6k-gCIANYcpoa_tE_fIpLa8A',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: queryString({
        amount: `${this.state.price}`,
        mobile: this.state.tel.replace(/\s/g, ''),
        pin: newPin
      })
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
