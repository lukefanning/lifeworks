'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import config from '../config';
import { changeCurrency } from '../actions';

const Currency = ({ currency, dispatch }) => {
  const currencies = config.currencies;

  return (
    <div style={styles.container}>
      <select style={styles.select} defaultValue={currency} onChange={(e) => dispatch(changeCurrency(e.target.value))}>
        {Object.keys(currencies).map(c => <option key={c} value={c}>{currencies[c].option}</option>)}
      </select>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'right',
    paddingRight: '1rem'
  },
  select: {
    fontSize: '1.5rem'
  }
}

const mapStateToProps = state => {
  return { currency: state.get('currency') }
}

export default connect(mapStateToProps)(Currency);
