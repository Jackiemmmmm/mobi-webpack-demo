import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/home1/1" >home1</Link>
        <Link to="/home2/2" >home2</Link>
        <Link to="/about" >to about</Link>
      </div>
    )
  }
}
