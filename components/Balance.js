'use strict';

import React, { PropTypes } from 'react';
import config from '../config';
import { connect } from 'react-redux';

const Balance = ({ currency, balance }) => {
  currency = config.currencies[currency];

  return (
    <div style={styles.container}>
      {currency.symbol}{balance.toFixed(currency.dp)}
    </div>
  );
}

Balance.propTypes = {
  currency: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired
}

const styles = {
  container: {
    background: 'url(../static/money-bag.png) no-repeat center',
    backgroundSize: 'contain',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '6vmin'
  }
}

const mapStateToProps = state => {
  return {
    currency: state.get('currency'),
    balance: state.get('balance')
  }
}

export default connect(mapStateToProps)(Balance);
