'use strict';

import React, { PropTypes } from 'react';
import config from '../config';
import { connect } from 'react-redux';
import { doTransaction } from '../actions';

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.keyHistory = [];
  }
  onClick(add) {
    if (!this.amountIsValid()) {
      return;
    }

    const value = Number.parseFloat(this.state.value);
    this.props.dispatch(doTransaction(add ? value : value * -1));
  }
  amountIsValid() {
    // Check amount is a positive float
    const value = Number.parseFloat(this.state.value);
    if (isNaN(value) || value <= 0) {
      return false;
    }

    // Check amount is within the maximum decimal places for currency
    const currency = config.currencies[this.props.currency];
    if (value !== Number.parseFloat(value.toFixed(currency.dp))) {
      return false;
    }

    // Amount is valid
    return true;
  }
  canRemove() {
    // Amount must be valid
    if (!this.amountIsValid()) {
      return false;
    }

    // Amount must not exceed the balance
    const value = Number.parseFloat(this.state.value);
    if (this.props.balance < value) {
      return false;
    }

    // Can remove amount from balance
    return true;
  }
  onKeyDown(keyCode) {
    // Easter egg!
    let keyHistory = this.keyHistory;
    if (keyHistory.length === 10) {
      keyHistory.splice(0, 1);
    }
    keyHistory.push(keyCode);
    if (JSON.stringify(keyHistory) === JSON.stringify([38, 38, 40, 40, 37, 39, 37, 39, 66, 65])) {
      this.props.dispatch(doTransaction(1337));
    }
  }
  render() {
    const currency = config.currencies[this.props.currency];
    const min = 1 / Math.pow(10, currency.dp);

    return (
      <div style={styles.container}>
        <span style={styles.symbol}>{currency.symbol}</span>
        <input style={styles.input}
               onChange={e => this.setState({value: e.target.value})}
               onKeyDown={e => this.onKeyDown(e.keyCode)}
               type='number'
               min={min} step={min} value={this.state.value} />
        <button style={styles.button} onClick={() => this.onClick(true)} disabled={!this.amountIsValid()}>+</button>
        <button style={styles.button} onClick={() => this.onClick(false)} disabled={!this.canRemove()}>-</button>
      </div>
    );
  }
}

Transaction.propTypes = {
  currency: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

const styles = {
  container: {
    marginTop: 10,
    paddingRight: 10,
    textAlign: 'right'
  },
  symbol: {
    position: 'relative',
    marginRight: -20,
    fontSize: '1.5rem'
  },
  input: {
    paddingLeft: 20,
    fontSize: '1.5rem',
    maxWidth: 'calc(100% - 60px - 2rem)'
  },
  button: {
    width: 30,
    fontSize: '1.5rem'
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.get('currency'),
    balance: state.get('balance')
  }
}

export default connect(mapStateToProps)(Transaction);
