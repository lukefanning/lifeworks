'use strict';

import { Map, List } from 'immutable';
import { DO_TRANSACTION, RESET, CHANGE_CURRENCY } from '../actions';
import config from '../config';

function doTransaction(state, amount) {
  let map = state.set('balance', state.get('balance') + amount);
  return map.set('transactions', map.get('transactions').push(Map({time: Date.now(), amount: amount})));
}

function reset(state) {
  return state.set('balance', 0).set('transactions', List([]));
}

function changeCurrency(state, currency) {
  // Get the rate of the current and new currency
  const currRate = config.currencies[state.get('currency')].rate;
  const newRate = config.currencies[currency].rate;

  // Convert the current balance and all transactions to new currency
  let map = state.set('balance', state.get('balance') / currRate * newRate);
  map = map.set('transactions', state.get('transactions').map(trans => Map({time: trans.get('time'), amount: trans.get('amount') / currRate * newRate})));

  // Change the currency
  return map.set('currency', currency);
}

export default (state, action) => {
  if (state === undefined) {
    return Map({
      currency: 'gbp',
      balance: 0,
      transactions: List([])
    });
  }

  switch (action.type) {
    case DO_TRANSACTION:
      return doTransaction(state, action.amount);
    case RESET:
      return reset(state);
    case CHANGE_CURRENCY:
      return changeCurrency(state, action.currency);
    default:
      return state;
  }
}
