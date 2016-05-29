'use strict';

import { Map, List } from 'immutable';
import { DO_TRANSACTION, RESET, CHANGE_CURRENCY } from '../actions';

function doTransaction(state, amount) {
  return state.set('balance', state.get('balance') + amount).set('transactions', state.get('transactions').push(Map({time: Date.now(), amount: amount})));
}

function reset(state) {
  return state.set('balance', 0).set('transactions', List([]));
}

function changeCurrency(state, currency) {
  return state.set('currency', currency);
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
