import React from 'react';
import classNames from 'classnames'
import styles from './ListItem.css';

const ListItem = ({ data, pushTo }) => {
  const title = data.title;
  const num = data.num;
  const image = data.image;
  const currency = data.currency;
  return (
    <div className={styles.listWrap} onClick={() => pushTo(title)}>
      <div className={classNames(styles.image, image && styles.show)}>{image && 'have image'}</div>
      <p>
        {title}
        <span>({num}) {currency}</span>
      </p>
      <div className={styles.arrowRight}>arrowRight</div>
    </div>
  )
}

export default ListItem;
