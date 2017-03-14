import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import NavBar from '../../components/NavBar';
import ListItem from '../../components/ListItem';
import styles from './withdraw.css';
// import { linkSaga } from '../../actions';

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
        <NavBar title={'Withdraw'} />
        {this.props.test}
        <div style={{ width: '100%', height: '1px', backgroundColor: 'black' }} />
        {this.state.updateData.length > 0 && this.state.updateData.map(data =>
          <ListItem
            key={data.title}
            data={data}
            pushTo={() => this._linkTo(data.title)}
          />)}
      </div>
    )
  }
  _linkTo(title) {
    console.log(title);
  }
}
export default connect(
  // state => ({
  //   test: state.Withdraw.defaultWithdraw
  // }),
  // dispatch => ({
  //   linkSaga: bindActionCreators(linkSaga, dispatch)
  // })
  null
)(Withdraw)
