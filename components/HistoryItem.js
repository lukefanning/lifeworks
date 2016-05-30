'use strict';

import React, { PropTypes } from 'react';
import config from '../config';
import moment from 'moment';

const HistoryItem = ({ currency, transaction }) => {
  currency = config.currencies[currency];
  let { amount, time } = transaction;
  const amountStr = `${amount < 0 ? '-' : '+'}${currency.symbol}${Math.abs(amount).toFixed(currency.dp)}`;

  return (
    <div style={styles.container}>
      <div>
        {moment(time).format(config.historyMomentFormat)}
      </div>
      <div>
        <span style={{color: amount < 0 ? 'red' : 'green'}}>{amountStr}</span>
      </div>
    </div>
  );
}

HistoryItem.propTypes = {
  currency: PropTypes.string.isRequired,
  transaction: PropTypes.object.isRequired
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.5rem'
  }
}

export default HistoryItem;
