import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
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
    const { bits, sendData } = this.props;
    return (
      <div className={styles.withdraw}>
        <div>
          <h6>Send</h6>
          <div>
            <span>BTC</span>
            <div>
              <input type="number" placeholder="Amount" />
              <span>Available: {bits} bits</span>
            </div>
            <span>bits</span>
          </div>
        </div>
        <div>
          <h6>to {sendData.title} ({sendData.num})</h6>
          <div>
            <span>{sendData.image}</span>
            <div>
              <input type="number" placeholder="Amount" />
            </div>
            <span>{sendData.currency}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({
    bits: state.Withdraw.bits,
    sendData: state.Withdraw.sendData
  }),
  // dispatch => ({
  //   linkSaga: bindActionCreators(linkSaga, dispatch)
  // })
  null
)(WithdrawSend)
