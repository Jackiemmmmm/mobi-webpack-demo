import React from 'react';
import classNames from 'classnames';
import styles from './profile.css';

const InputItem = ({ type, placeholder, name, getVal, isShow = true, defaultVal = '' }) => (
  <div className={classNames(styles.inputItem, !isShow && styles.hide)}>
    <input
      onChange={e => getVal(e)}
      type={type}
      placeholder={placeholder || name}
      name={name}
      defaultValue={defaultVal}
    />
  </div>
);

export default InputItem;
