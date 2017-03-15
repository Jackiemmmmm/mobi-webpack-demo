import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class Recipient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      bankName: '',
      bankNumber: '',
      elseInfo: ''
    }
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          style={{ marginBottom: '10px' }}
          onChange={event => this.setState({ username: event.target.value })}
          placeholder="Recipient's full legal name"
        />
        <input
          style={{ marginBottom: '10px' }}
          onChange={event => this.setState({ bankName: event.target.value })}
          placeholder="Bank name"
        />
        <input
          style={{ marginBottom: '10px' }}
          onChange={event => this.setState({ bankNumber: event.target.value })}
          placeholder="Bank account number"
        />
        <input
          style={{ marginBottom: '10px' }}
          onChange={event => this.setState({ elseInfo: event.target.value })}
          placeholder="Other delivery information..."
        />
        <button onClick={() => this._save()}>Save</button>
      </div>
    )
  }
  _save() {
    console.log(this.state);
    browserHistory.goBack();
  }
}
