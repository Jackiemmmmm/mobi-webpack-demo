import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import ListItem from '../../components/ListItem';
import styles from './withdraw.css';
import { goToSend } from '../../actions';

class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: true,
      image1: false,
      updateData: []
    }
  }
  componentWillMount() {
    this.setState({
      updateData: [
        {
          title: 'Tony Stark',
          num: 1234,
          image: true,
          currency: 'EUR',
        },
        {
          title: 'Benjamin Button',
          num: 5678,
          image: false,
          currency: 'DOLLER',
        }
      ]
    })
  }
  render() {
    return (
      <div className={styles.withdraw}>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'black' }} />
        {this.state.updateData.length > 0 && this.state.updateData.map(data =>
          <ListItem
            key={data.title}
            data={data}
            pushTo={() => this._linkTo(data)}
          />)}
      </div>
    )
  }
  _linkTo(data) {
    browserHistory.push(`/withdraw:${data.num}`);
    goToSend(data)
  }
}
const mapDispatchToProps = (dispatch) => {
  console.log('dispatch', dispatch)
  return {
    goToSend: (data) => {
      dispatch(goToSend(data))
    }
  }
}

export default connect(
  // state => ({
  //   test: state.Withdraw.defaultWithdraw
  // })
  null,
  mapDispatchToProps
)(Withdraw)
