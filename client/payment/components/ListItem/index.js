import React from 'react';
import classNames from 'classnames';
import styles from './ListItem.css';
import ArrowLeftIcon from '../../../common/icons/ArrowLeftIcon';

const ListItem = ({ data, pushTo, style }) => {
  const title = data.title;
  const num = data.num;
  const image = data.image;
  const currency = data.currency;
  return (
    <div className={styles.listWrap} style={style} onClick={() => pushTo(title)}>
      <div className={classNames(styles.image, image && styles.show)}>{image && 'have image'}</div>
      <p>
        {title}
        {num && <span>({num}) {currency}</span>}
      </p>
      <div className={styles.arrowRight}><ArrowLeftIcon color={'#000'} rotate={'rotate(180deg)'} /></div>
    </div>
  )
}

export default ListItem;
