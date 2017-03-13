import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavBar from '../../components/NavBar';
import ListItem from '../../components/ListItem';
import styles from './withdraw.css';
import { linkSaga } from '../../actions';

class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: true,
      image1: false
    }
  }
  render() {
    return (
      <div className={styles.withdraw}>
        <NavBar title={'Withdraw'} />
        {this.props.test}
        <div style={{ width: '100%', height: '1px', backgroundColor: 'black' }} />
        <ListItem title={'Tony Stark'} num={1234} image={this.state.image} currency={'EUR'} pushTo={(text) => { this._linkTo(text) }} />
        <ListItem title={'Benjamin Button'} num={5678} image={this.state.image1} currency={'EUR'} pushTo={(text) => { this._linkTo(text) }} />
      </div>
    )
  }
  _linkTo(title) {
    console.log(title);
  }
}
export default connect(
  state => ({
    test: state.Withdraw.defaultWithdraw
  }),
  dispatch => ({
    linkSaga: bindActionCreators(linkSaga, dispatch)
  })
)(Withdraw)
