import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import NavBar from '../../components/NavBar';
import styles from './withdrawSend.css';
// import { linkSaga } from '../../actions';

class WithdrawSend extends Component {
  //   constructor(props) {
  //     super(props);
  //   }
  // <SendComponent />
  // <SendComponent />
  // <ClickBtn text={'Send'} />
  render() {
    const { bits } = this.props;
    return (
      <div className={styles.withdraw}>
        <NavBar title={'Withdraw'} />
        <div>
          <h6>Send</h6>
          <div>
            <span>BTC</span>
            <div>
              <input type="number" placeholder="Amount" />
              <span>Available: {bits} bits</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({
    bits: state.Withdraw.bits
  }),
  // dispatch => ({
  //   linkSaga: bindActionCreators(linkSaga, dispatch)
  // })
  null
)(WithdrawSend)
