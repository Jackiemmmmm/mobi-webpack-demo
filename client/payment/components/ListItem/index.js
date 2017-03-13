import React from 'react';
import classNames from 'classnames'
import styles from './ListItem.css';

const ListItem = ({ title, num, image, currency, pushTo }) => (
  <div className={styles.listWrap} onClick={() => pushTo(title)}>
    <div className={classNames(styles.image, image && styles.show)}>{image && 'have image'}</div>
    <p>
      {title}
      <span>({num}){currency}</span>
    </p>
    <div className={styles.arrowRight}>arrowRight</div>
  </div>
)

export default ListItem;
