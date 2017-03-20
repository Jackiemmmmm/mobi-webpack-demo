import React from 'react';
import classNames from 'classnames';
import styles from './fare.css';

const LandscapeAlert = ({ isShow, onClick }) => (
  <div className={classNames(styles.alertWrap, isShow && styles.hide)}>
    <p>竖屏体验更佳</p>
    <br />
    <a onClick={() => onClick()}>知道了</a>
  </div>
);

export default LandscapeAlert;
