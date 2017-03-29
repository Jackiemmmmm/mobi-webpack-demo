import React, { Component } from 'react';
import classNames from 'classnames';
import fetch from 'isomorphic-fetch';
import Picker from './Picker';
import InputItem from './InputItem';
import styles from './profile.css';

const generateNumberArray = (begin, end) => {
  const array = [];
  for (let i = begin; i <= end; i += 1) {
    array.push((i < 10 ? '0' : '') + i);
  }
  return array;
}

class Profile extends Component {
  // constructor(props) {
  //   super(props);
  //   this
  // }
  state = {
    isPickerShow: false,
    isShow: false,
    showOption: false,
    valueGroups: {
      year: '2000',
      month: '01',
      day: '01'
    },
    optionGroups: {
      year: generateNumberArray(1950, 2010),
      month: generateNumberArray(1, 12),
      day: generateNumberArray(1, 31)
    },
    oldOptions: {},
    SaveData: {}
  };
  _getCountry = {};

  componentWillMount() {
    fetch('https://staging-wallet-api.btcc.com/v2/public/country', {
      method: 'GET'
    }).then((resp) => {
      resp.text().then((resolve) => {
        if (resolve.ref === 1) {
          this._getCountry = resolve.countries;
        }
      });
    }).catch(err => (console.log(err)));
  }
  render() {
    const { optionGroups, valueGroups, isShow, showOption, oldOptions } = this.state;
    return (
      <div style={{ overflow: 'hidden' }}>
        <InputItem name={'First Name'} type={'text'} getVal={this._getVal} />
        <InputItem isShow={isShow} name={'Middle Name'} type={'text'} getVal={this._getVal} />
        <InputItem name={'Last Name'} type={'text'} getVal={this._getVal} />
        <div className={classNames(styles.addName, isShow && styles.hide)}>
          <a onClick={() => this._changeState('AddName')}>Add Middle Name</a>
        </div>
        <InputItem name={'Email'} type={'email'} getVal={this._getVal} />
        <div className={styles.choseItem}>
          <a onClick={() => this._changeState('ShowOptions')}>{`${valueGroups.year}-${valueGroups.month}-${valueGroups.day}`}</a>
        </div>
        <InputItem name={'Phone number'} type={'tel'} getVal={this._getVal} onBlur={this._onBlur} />
        <div className={styles.choseItem}>
          <a onClick={() => this._changeState('ShowCountry')}>{navigator.language}</a>
        </div>
        <InputItem name={'Address'} type={'text'} getVal={this._getVal} />
        <InputItem name={'City'} type={'text'} getVal={this._getVal} />
        <InputItem name={'State/Province'} type={'text'} getVal={this._getVal} />
        <InputItem name={'Postal code'} type={'tel'} getVal={this._getVal} />
        {showOption && <div className={styles.optionWrap}>
          <div className={styles.optionsPosition}>
            <div className={styles.optionsBtn}>
              <a onClick={() => this._changeState('HideOptions', oldOptions)}>Cancel</a>
              <a onClick={() => this._changeState('HideOptions')}>OK</a>
            </div>
            <Picker
              optionGroups={optionGroups}
              valueGroups={valueGroups}
              onChange={this._handleChange}
            />
          </div>
        </div>}
        <a onClick={this._submit}>Save</a>
      </div>
    );
  }
  _handleChange = (name, value) => {
    this.setState(({ valueGroups, optionGroups }) => {
      const nextState = {
        valueGroups: {
          ...valueGroups,
          [name]: value
        }
      };
      if (name === 'year' && valueGroups.month === '02') {
        if (parseInt(value, 10) % 4 === 0) {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 29)
          };
        } else {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 28)
          };
        }
      } else if (name === 'month') {
        if (value === '02') {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 28)
          };
        } else if (['01', '03', '05', '07', '08', '10', '12'].indexOf(value) > -1 &&
          ['01', '03', '05', '07', '08', '10', '12'].indexOf(valueGroups.month) < 0) {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 31)
          };
        } else if (['01', '03', '05', '07', '08', '10', '12'].indexOf(value) < 0 &&
          ['01', '03', '05', '07', '08', '10', '12'].indexOf(valueGroups.month) > -1) {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 30)
          };
        }
      }
      return nextState;
    });
  };
  _changeState = (name, args = null) => {
    const { valueGroups, SaveData } = this.state;
    const set = obj => (this.setState(obj));
    let newData = {};
    switch (name) {
      case 'AddName':
        return set({ isShow: true });
      case 'ShowOptions':
        return set({
          showOption: true,
          oldOptions: {
            year: valueGroups.year,
            month: valueGroups.month,
            day: valueGroups.day
          }
        });
      case 'HideOptions':
        if (args) {
          return set({
            showOption: false,
            valueGroups: {
              year: args.year,
              month: args.month,
              day: args.day
            },
          })
        }
        return set({ showOption: false });
      case 'SaveData':
        newData = Object.assign({}, SaveData, args)
        return set({ SaveData: newData });
      default:
        break;
    }
  }
  _getVal = (e) => {
    const val = e.target.value;
    let SaveObj = {};
    switch (e.target.name) {
      case 'First Name':
        SaveObj = { firstName: val };
        break;
      case 'Middle Name':
        SaveObj = { middleName: val };
        break;
      case 'Last Name':
        SaveObj = { lastName: val };
        break;
      case 'Email':
        SaveObj = { email: val };
        break;
      case 'Phone number':
        SaveObj = { phoneNumber: val };
        break;
      case 'Address':
        SaveObj = { adress: val };
        break;
      case 'City':
        SaveObj = { city: val };
        break;
      case 'State/Province':
        SaveObj = { province: val };
        break;
      case 'Postal code':
        SaveObj = { postalCode: val };
        break;
      default:
        break;
    }
    this._changeState('SaveData', SaveObj);
  }
  _showOptionGroups = () => {

  }
  _submit = () => {
    const { SaveData, valueGroups } = this.state;
    console.log(SaveData, valueGroups, navigator.language);
  }
}

export default Profile;
