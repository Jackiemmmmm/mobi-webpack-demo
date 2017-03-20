import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './fare.css';
import { formatPrice } from '../../../common/utlis/format';
import DeleteIcon from '../../icons/DeleteIcon';
import LandscapeAlert from './LandscapeAlert';
import FareItem from './FareItem';

class TelFare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '',
      canBuy: [30, 50, 100, 200, 300, 500],
      chose: null,
      price: null,
      show: false
    }
    this.lastVal = '';
    this.input = null;
  }
  componentWillMount() {
    if (window.JSInterface) {
      this._testAvailable = window.JSInterface.getRmbBalance();
      this.setState({
        tel: window.JSInterface.getPhoneNum()
      });
    }
    this._checkCompany();
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    return (
      <div>
        <div className={styles.inputNumber}>
          <label htmlFor="tel">
            +86
            <input
              ref={e => (this.input = e)}
              id="tel"
              type="text"
              name="phone"
              onChange={event => this._change(event)}
              value={this.state.tel}
              placeholder={this._fromNativeNumber}
              maxLength={13}
              pattern="[0-9]*"
            />
          </label>
          <span>中国电信</span>
          {this.state.tel.length > 0 && <a onClick={() => { this.setState({ tel: '' }); this.input.focus(); }}><DeleteIcon /></a>}
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
          className={classNames(styles.btn, this.state.tel.length !== 13 && styles.unClick)}
          onClick={() => this._submitFare()}
        >
          Top Up
        </button>
        <LandscapeAlert isShow={this.state.show} onClick={() => this.setState({ show: true })} />
      </div>
    )
  }
  _checkCompany() {
    const body = JSON.stringify({ phoneNum: '18516011992' })
    // { this._checkCompany(this.state.tel) }
    fetch('http://172.16.1.36:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
      body: body
    }).then((res) => {
      // console.log(res, res.blob(), res.body, 'res');
      res.text().then(resolve => console.log(resolve));
    }).catch(err => (
      console.log(err)
    ))
  }
  _change(event) {
    const eventTarget = event.target.value;
    if (eventTarget.length === 13) {
      this.setState({ tel: eventTarget });
      this.lastVal = eventTarget;
      return;
    }
    const val = eventTarget.replace(/\s/g, '');
    const a = val.substring(0, 3);
    const b = val.substring(3, 7);
    const c = val.substring(7, 11);
    let newVal = '';
    if (a && b && c) {
      newVal = `${a} ${b} ${c}`;
    } else if (a && b) {
      newVal = `${a} ${b}`
    } else {
      newVal = `${a}`
    }
    this.setState({
      tel: newVal
    });
  }
  _submitFare() {
    if (this.state.tel.length !== 13) return alert('请输入正确的电话号码');
    if (this.state.price === null) return alert('请选择价格');
    console.log(this.state.tel, this.state.price);
  }
}

export default connect()(TelFare);
