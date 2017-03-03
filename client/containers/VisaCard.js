import React, { Component } from 'react';
import styles from './VisaCardCss';
import VisaCardImg from '../images/card_blocked.png'

export default class VisaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apply: null,
      knowMore: null,
      test: null,
      test1: null,
    } 
  }
  componentWillMount() {
    // pushLanguage
    if (window.JSInterface) {
      this.setState({
        test: 'from android native : ' + window.JSInterface.pushPhoneNum(),
        test1: 'from android native : ' + window.JSInterface.pushLanguage(),
      })
    }
  }
  render() {
    return (
      <div className={styles.cardWarrper}>
        <div className={styles.cardImageLayout}>
          <img src={VisaCardImg} />
          <span></span>
        </div>

        <div className={styles.cardTextLayout}>
          <ul>
            <li>Use your existing money in mobi to pay anywhere Visa® is accepted.</li>
            <li>Get cash at more than 2 Million Visa® compatible ATMs.</li>
            <li>No Fees when used with U.S. Dollars. Zero. Zilch. Nada.</li>
            <li>Free worldwide shipping.</li>
            <li>{this.state.test}</li>
            <li>{this.state.test1}</li>
          </ul>
          <a onClick={() => this._goToNative('apply')} className={styles.btnApply}>Get 3 months free trial</a>
          <a onClick={() => this._goToNative('knowMore')} className={styles.btnKnowMore} href="#">$2<span>/</span>month after trial</a>
        </div>
      </div>
    )
  }
  _goToNative(result) {
    window.JSInterface && window.JSInterface.toCreateCard();
  }
}