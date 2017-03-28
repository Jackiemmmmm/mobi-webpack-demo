import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
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
      </div>
    )
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
