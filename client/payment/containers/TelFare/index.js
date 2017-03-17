// import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './fare.css';
import { formatPrice } from '../../../common/utlis/format';
import DeleteIcon from '../../icons/DeleteIcon';

const FareItem = ({ price, checkIndex, chose }) => (
  <a className={classNames(styles.fareItem, chose && styles.chose)} onClick={() => checkIndex()}>
    <span>{price}</span>
  </a>
);

const LandscapeAlert = ({ isShow, onClick }) => (
  <div className={classNames(styles.alertWrap, isShow && styles.hide)}>
    <p>竖屏体验更佳</p>
    <br />
    <a onClick={() => onClick()}>知道了</a>
  </div>
);

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
    this.lastVal = 0;
  }
  componentWillMount() {
    this._testAvailable = 1590.32;
    this._fromNativeNumber = '185 1601 1992'
  }
  render() {
    return (
      <div>
        <div className={styles.inputNumber}>
          <label htmlFor="tel">
            <input
              id="tel"
              type="text"
              name="phone"
              onChange={event => this._change(event)}
              value={this.state.tel}
              placeholder={this._fromNativeNumber}
              maxLength={13}
              pattern="[0-9]*"
            />
            中国电信
          </label>
          {this.state.tel.length > 0 && <a onClick={() => this.setState({ tel: '' })}><DeleteIcon /></a>}
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
        <div>
          <span>Available {formatPrice(this._testAvailable)}</span>
        </div>
        <button onClick={() => this._submitFare()}>
          Top Up
        </button>
        <LandscapeAlert isShow={this.state.show} onClick={() => this.setState({ show: true })} />
      </div>
    )
  }
  // _checkCompany() {
  // {this._checkCompany(this.state.tel)}
  // if (tel.length !== 11) return;
  // fetch('https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=15850781443', {
  //   method: 'GET'
  // }).then(res => (
  //   console.log(res.json())
  // )).then(err => (
  //   console.log(err)
  // ));
  // }
  _change(event) {
    const val = event.target.value;
    console.log(this.lastVal, val.length);
    // console.log(a);
    // if (val.length === 3 || val.length === 8) {
    //   if (this.lastVal && this.lastVal.length > val.length) {
    //     this.lastVal = a.slice(0, -1);
    //     return this.setState({ tel: a.slice(0, -1) });
    //   }
    //   this.lastVal = a.concat(' ');
    //   return this.setState({ tel: a.concat(' ') });
    // }
    const test = '';
    const b = val.substring(0, 3).concat(' ');
    const c = val.substring(4, 8).concat(' ');
    if (this.lastVal < val.length) {
      switch (val.length) {
        case 3:
          this.lastVal = test.concat(b).length
          return this.setState({ tel: test.concat(b) });
        case 8:
          this.lastVal = test.concat(b, c).length
          return this.setState({ tel: test.concat(b, c) });
        default:
          this.lastVal = val.length
          return this.setState({ tel: val });
      }
    } else if (this.lastVal > val.length) {
      switch (val.split(' ').join('').length) {
        case 3:
          this.lastVal = test.slice(0, -1).length
          return this.setState({ tel: val.slice(0, -1) });
        case 8:
          this.lastVal = test.slice(0, -1).length
          return this.setState({ tel: val.slice(0, -1) });
        default:
          this.lastVal = val.length
          return this.setState({ tel: val });
      }
    }
  }
  _submitFare() {
    if (this.state.tel.length !== 11) return alert('请输入正确的电话号码');
    if (this.state.price === null) return alert('请选择价格');
    console.log(this.state.tel, this.state.price);
  }
}

export default connect()(TelFare);
