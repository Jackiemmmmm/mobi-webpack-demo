import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { DatePicker } from 'antd';
import ListItem from '../../components/ListItem';
import styles from './withdraw.css';
import Actions from '../../actions';

class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: true,
      image1: false
    }
  }
  componentWillMount() {
  }
  render() {
    const { updateData } = this.props;
    return (
      <div className={styles.withdraw}>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'black' }} />
        {updateData.length > 0 && updateData.map(data =>
          <ListItem
            key={data.title}
            data={data}
            pushTo={() => this._linkToSend(data)}
          />)}
        <ListItem
          data={{ title: 'New Recipient' }}
          pushTo={() => browserHistory.push('/newRecipient')}
        />
        <ListItem
          data={{ title: 'My Profile' }}
          pushTo={() => browserHistory.push('/profile')}
          style={{ marginTop: '2rem', borderTop: '1px solid black' }}
        />
        <ListItem
          data={{ title: 'Transfer History' }}
          pushTo={() => browserHistory.push('/history')}
        />
        <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          disabledDate={() => this._disabledDate()}
          disabledTime={() => this._disabledDateTime()}
          showTime
        />
      </div>
    )
  }
  _range(start, end) {
    const result = [];
    for (let i = start; i < end; i += 1) {
      result.push(i);
    }
    return result;
  }
  _disabledDate(current) {
    // can not select days before today and today
    return current && current.valueOf() > Date.now();
  }

  _disabledDateTime() {
    return {
      disabledHours: () => this._range(0, 24).splice(4, 20),
      disabledMinutes: () => this._range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  _linkToSend(data) {
    const { goToSend } = this.props;
    browserHistory.push('/withdrawSend');
    goToSend(data)
  }
}

export default connect(
  state => ({
    updateData: state.Withdraw.updateData
  }),
  dispatch => ({
    goToSend: data => dispatch(Actions.goToSend(data))
  }),
)(Withdraw)
