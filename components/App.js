'use strict';

import React from 'react';
import Balance from './Balance';
import Transaction from './Transaction';
import History from './History';
import Header from './Header';
import Currency from './Currency';

const App = () => (
  <div style={styles.container}>
    <Header />
    <div style={styles.content}>
      <div style={styles.balance}>
        <Balance />
      </div>
      <div style={styles.rightColumn}>
        <div style={styles.currency}>
          <Currency />
        </div>
        <div style={styles.history}>
          <History />
        </div>
        <div style={styles.transaction}>
          <Transaction />
        </div>
      </div>
    </div>
  </div>
)

const styles = {
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden'
  },
  content: {
    height: 'calc(100% - 55px)'
  },
  balance: {
    float: 'left',
    width: '50%',
    position: 'relative',
    height: '100%'
  },
  rightColumn: {
    float: 'right',
    width: '50%',
    height: '100%'
  },
  currency: {
    height: 50
  },
  history: {
    height: 'calc(100% - 100px)'
  },
  transaction: {
    height: 50
  }
}

export default App;
