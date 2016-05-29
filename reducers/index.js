'use strict';

import { Map, OrderedSet } from 'immutable';
import { DO_TRANSACTION, RESET } from '../actions';

function doTransaction(state, amount) {
  return state.set('balance', state.get('balance') + amount).set('transactions', state.get('transactions').add({time: Date.now(), amount: amount}));
}

function reset(state) {
  return state.set('balance', 0).set('transactions', OrderedSet([]));
}

export default (state, action) => {
  if (state === undefined) {
    return Map({
      currency: 'gbp',
      balance: 0,
      transactions: OrderedSet([])
    });
  }

  switch (action.type) {
    case DO_TRANSACTION:
      return doTransaction(state, action.amount);
    case RESET:
      return reset(state);
    default:
      return state;
  }
}
