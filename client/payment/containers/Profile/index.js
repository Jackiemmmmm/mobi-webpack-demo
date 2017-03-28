import React, { Component } from 'react';
import Picker from './Picker';
// import styles from './profile.css';

const generateNumberArray = (begin, end) => {
  const array = [];
  for (let i = begin; i <= end; i += 1) {
    array.push((i < 10 ? '0' : '') + i);
  }
  return array;
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPickerShow: false,
      valueGroups: {
        year: '1989',
        month: '08',
        day: '12'
      },
      optionGroups: {
        year: generateNumberArray(1950, 2000),
        month: generateNumberArray(1, 12),
        day: generateNumberArray(1, 31)
      }
    };
  }

  handleChange = (name, value) => {
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

  render() {
    const { optionGroups, valueGroups } = this.state;
    return (
      <div>
        <Picker
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Profile;
