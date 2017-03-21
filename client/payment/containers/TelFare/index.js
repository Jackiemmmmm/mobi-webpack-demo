import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './fare.css';
import { formatPrice } from '../../../common/utlis/format';
import DeleteIcon from '../../icons/DeleteIcon';
import FareItem from './FareItem';

class TelFare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '',
      canBuy: [30, 50, 100, 200, 300, 500],
      chose: 0,
      price: 30,
      type: '',
      isShow: true
    }
    this.lastVal = '';
    this.input = null;
  }
  componentWillMount() {
    if (window.JSInterface) {
      this._testAvailable = window.JSInterface.getRmbBalance();
      const getPhoneNum = window.JSInterface.getPhoneNum();
      this._formatPhone(getPhoneNum, newVal => (
        this.setState({
          tel: newVal
        })
      ))
      this._checkCompany(getPhoneNum);
    }
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    const telLength = this.state.tel.length
    console.log(telLength, this.state.isShow);
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
          <span>{telLength === 13 && this.state.type}</span>
          {telLength > 0 && <a onClick={() => { this.setState({ tel: '' }); this.input.focus(); }}><DeleteIcon /></a>}
        </div>
        <h3 className={styles.mobileTitle}>Mobile Top Up</h3>
        <div className={styles.priceWrap}>
          {this.state.canBuy.map((price, idx) =>
            <FareItem
              key={price}
              price={price}
              checkIndex={() => this.setState({ chose: idx, price: price })}
              chose={this.state.chose === idx}
            />)}
        </div>
        <div className={styles.total}>
          <p>Total Balance <span>{formatPrice(this._testAvailable)}</span></p>
        </div>
        <button
          className={classNames(styles.btn,
            (telLength !== 13 || !this.state.isShow) && styles.unClick)}
          onClick={() => this._submitFare()}
        >
          Top Up
        </button>
      </div>
    )
  }
  _checkCompany(tel) {
    const body = JSON.stringify({ phoneNum: tel });
    fetch('http://10.0.20.227:3000/area', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
      body: body
    }).then((res) => {
      // console.log(res, res.blob(), res.body, 'res');
      res.text().then((resolve) => {
        const resp = JSON.parse(resolve);
        if (resp.status === 'success' && resp.message) {
          this.setState({
            type: resp.message.type.replace('中国', resp.message.province),
            isShow: true
          })
        } else {
          this.setState({
            type: '输入信息有误',
            isShow: false
          })
        }
      });
    }).catch(err => (
      console.log(err)
    ))
  }
  _change(event) {
    const eventTarget = event.target.value;
    if (eventTarget.length === 13) {
      this.setState({ tel: eventTarget });
      this.lastVal = eventTarget;
      this._checkCompany(eventTarget.replace(/\s/g, ''))
      return;
    }
    const val = eventTarget.replace(/\s/g, '');
    this._formatPhone(val, newVal => (
      this.setState({
        tel: newVal,
        type: '',
        isShow: false
      })
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
    if (this.state.tel.length !== 13) return alert('请输入正确的电话号码');
    if (this.state.price === null) return alert('请选择价格');
    if (!this.state.isShow) return alert('请输入正确信息');
    console.log(this.state.tel, this.state.price);
  }
}

export default connect()(TelFare);
