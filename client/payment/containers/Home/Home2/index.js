import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/about" >to about</Link>
      </div>
    )
  }
}
