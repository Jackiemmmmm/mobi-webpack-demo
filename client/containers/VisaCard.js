import React, { Component } from 'react';
import styles from './VisaCardCss.less';
import VisaCardImg from '../images/card_blocked.png';
import message from './message.json';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

export default class VisaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
      phoneNum: 'XXX XXXX XXXX'
    }
  }
  componentWillMount() {
    if (window.JSInterface) {
      this.setState({
        phoneNum: window.JSInterface.pushPhoneNum(),
        language: message[window.JSInterface.pushLanguage()] ? window.JSInterface.pushLanguage() : 'en',
      });
    }
  }
  render() {
    const language = message[this.state.language]
    return (
      <div className={styles.cardWarrper}>
        <div className={styles.backgroundLinear}>
          <header>
            <a onClick={() => this._goToNative('pop')} className={styles.arrowLeft}><ArrowLeftIcon /></a>
            {language.card_view_title}
          </header>
          <div className={styles.cardImageLayout}>
            <div className={styles.cardPosition}>
              <img src={VisaCardImg} alt="Mobi Visa Card" />
              <p>XXXX &nbsp; XXXX &nbsp; XXXX &nbsp; XXXX</p>
              <p>{this.state.phoneNum}</p>
            </div>
          </div>
        </div>

        <div className={styles.cardTextLayout}>
          <ul>
            <li>{language.card_intro_view_text_first}</li>
            <li>{language.card_intro_view_text_second}</li>
            <li>{language.card_intro_view_text_third}</li>
            <li>{language.card_intro_view_text_fourth}</li>
          </ul>
          <a onClick={() => this._goToNative('apply')} className={styles.btnApply}>
            {language.card_intro_view_button_trial}
          </a>
          <a onClick={() => this._goToNative('knowMore')} className={styles.btnKnowMore}>
            {language.card_intro_view_text_fee}
          </a>
        </div>
      </div>
    )
  }
  _goToNative(result) {
    if (!window.JSInterface) return;
    if (result === 'apply') {
      window.JSInterface.toCreateCard();
    } else if (result === 'knowMore') {
      window.JSInterface.toLimits('https://www.mobi.me/fees')
    } else if (result === 'pop') {
      window.JSInterface.toFinish();
    }
  }
}
