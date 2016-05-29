'use strict';

import React, { PropTypes } from 'react';
import config from '../config';
import moment from 'moment';

const HistoryItem = ({ currency, transaction }) => {
  currency = config.currencies[currency];
  let { amount, time } = transaction;

  return (
    <div style={styles.container}>
      <div>
        {moment(time).format(config.historyMomentFormat)}
      </div>
      <div>
        <span style={{color: amount < 0 ? 'red' : 'green'}}>{`${amount < 0 ? '-' : '+'}${currency.symbol}${Math.abs(amount).toFixed(currency.dp)}`}</span>
      </div>
    </div>
  )
};

HistoryItem.propTypes = {
  currency: PropTypes.string.isRequired,
  transaction: PropTypes.object.isRequired
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}

export default HistoryItem;
