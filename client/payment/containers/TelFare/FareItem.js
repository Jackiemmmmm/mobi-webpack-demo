import React from 'react';
import classNames from 'classnames';
import styles from './fare.css';
import CheckBox from '../../icons/CheckBox';

const FareItem = ({ price, checkIndex, chose }) => (
  <a className={classNames(styles.fareItem, chose && styles.chose)} onClick={() => checkIndex()}>
    <span>&yen;{price}</span>
    {chose && <CheckBox />}
  </a>
);

export default FareItem;
