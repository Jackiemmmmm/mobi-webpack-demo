import React from 'react';
import classNames from 'classnames';
import styles from './profile.css';

const InputItem = ({ type, placeholder, name, getVal, isShow = true, defaultVal = '' }) => {
  if (type === 'file') {
    return (
      <div className={styles.inputItem}>
        <label htmlFor={name}>
          <input
            onChange={e => getVal(e)}
            type={type}
            placeholder={placeholder || name}
            id={name}
            name={name}
            defaultValue={defaultVal}
            accept={'image/*'}
          />
          {name}
        </label>
      </div>
    )
  }
  return (
    <div className={classNames(styles.inputItem, !isShow && styles.hide)}>
      <input
        onChange={e => getVal(e)}
        type={type}
        placeholder={placeholder || name}
        name={name}
        defaultValue={defaultVal}
      />
    </div>
  )
};

export default InputItem;
