import React, { Component } from 'react';
import PickerColumn from './PickerColumn';
import styles from './profile.css';

export default class Picker extends Component {
  static defaultProps = {
    itemHeight: 36,
    height: 216
  };

  renderInner() {
    const { optionGroups, valueGroups, itemHeight, height, onChange } = this.props;
    const highlightStyle = {
      height: itemHeight,
      marginTop: -(itemHeight / 2)
    };
    const columnNodes = [];
    Object.keys(optionGroups).forEach((name) => {
      columnNodes.push(
        <PickerColumn
          key={name}
          name={name}
          options={optionGroups[name]}
          value={valueGroups[name]}
          itemHeight={itemHeight}
          columnHeight={height}
          onChange={onChange}
        />
      );
    })
    return (
      <div className={styles.pickerInner}>
        {columnNodes}
        <div className={styles.pickerHighlight} style={highlightStyle} />
      </div>
    );
  }

  render() {
    const style = {
      height: this.props.height
    };

    return (
      <div className={styles.pickerContainer} style={style}>
        {this.renderInner()}
      </div>
    );
  }
}
