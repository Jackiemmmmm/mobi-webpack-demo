import React, { Component } from 'react';
import styles from './VisaCardCss';
import VisaCardImg from '../images/card_blocked.png';
import {IntlProvider, addLocaleData, FormattedMessage} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import id from 'react-intl/locale-data/id';
import it from 'react-intl/locale-data/it';
// import jp from 'react-intl/locale-data/jp';
import ko from 'react-intl/locale-data/ko';
import nb from 'react-intl/locale-data/nb';
import pt from 'react-intl/locale-data/pt';
import ru from 'react-intl/locale-data/ru';
import th from 'react-intl/locale-data/th';
import vi from 'react-intl/locale-data/vi';
import message from './message.json';
addLocaleData([...en, ...zh, ...de, ...es, ...fr, ...id, ...it, ...ko, ...nb, ...pt, ...ru, ...th, ...vi]);

export default class VisaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: null,
      test1: null,
      language: 'en'
    }
  }
  componentWillMount() {
    // pushLanguage
    this.setState({
      language: 'en'
    })
    if (window.JSInterface) {
      this.setState({
        test: 'from android native : ' + window.JSInterface.pushPhoneNum(),
        test1: 'from android native : ' + window.JSInterface.pushLanguage(),
      })
    }
  }
  render() {
    return (
      <IntlProvider locate={this.state.language} >
        <div className={styles.cardWarrper}>
          <div className={styles.cardImageLayout}>
            <img src={VisaCardImg} />
            <span></span>
          </div>

          <div className={styles.cardTextLayout}>
            <ul>
              <li><FormattedMessage id="card_intro_view_text_first" defaultMessage={message[this.state.language]['card_intro_view_text_first']} /></li>
              <li><FormattedMessage id="card_intro_view_text_second" defaultMessage={message[this.state.language]['card_intro_view_text_second']} /></li>
              <li><FormattedMessage id="card_intro_view_text_third" defaultMessage={message[this.state.language]['card_intro_view_text_third']} /></li>
              <li><FormattedMessage id="card_intro_view_text_fourth" defaultMessage={message[this.state.language]['card_intro_view_text_fourth']} /></li>
              <li>{this.state.test}</li>
              <li>{this.state.test1}</li>
            </ul>
            <a onClick={() => this._goToNative('apply') } className={styles.btnApply}>
              <FormattedMessage id="card_intro_view_button_trial" defaultMessage={message[this.state.language]['card_intro_view_button_trial']} />
            </a>
            <a onClick={() => this._goToNative('knowMore') } className={styles.btnKnowMore} href="#">
              <FormattedMessage id="card_intro_view_text_fee" defaultMessage={message[this.state.language]['card_intro_view_text_fee']} />
            </a>
          </div>
        </div>
      </IntlProvider>
    )
  }
  _goToNative(result) {
    if (result === 'apply') {
      window.JSInterface && window.JSInterface.toCreateCard();
    } else {
      
    }
  }
}