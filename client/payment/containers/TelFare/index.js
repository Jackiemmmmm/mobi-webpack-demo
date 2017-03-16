// import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './fare.css';
import { formatPrice } from '../../../common/utlis/format';

const FareItem = ({ price, checkIndex, chose }) => (
  <a className={classNames(styles.fareItem, chose && styles.chose)} onClick={() => checkIndex()}>
    <span>{price}</span>
  </a>
)
class TelFare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '',
      canBuy: [30, 50, 100, 200, 300, 500],
      chose: null,
      price: null,
    }
  }
  componentWillMount() {
    this._testAvailable = 1590.32;
  }
  render() {
    return (
      <div>
        <div>
          <span>+86</span>
          <label htmlFor="tel">
            <input
              id="tel"
              type="number"
              onChange={event => this.setState({
                tel: event.target.value
              })}
            />
          </label>
        </div>
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
  _submitFare() {
    if (this.state.tel.length !== 11) return alert('请输入正确的电话号码');
    if (this.state.price === null) return alert('请选择价格');
    console.log(this.state.tel, this.state.price);
  }
}

export default connect()(TelFare);
