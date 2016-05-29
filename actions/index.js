'use strict';

/*
 * Action types
 */

export const DO_TRANSACTION = 'DO_TRANSACTION';
export const RESET = 'RESET';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';

/*
 * Action functions
 */

export function doTransaction(amount) {
  return { type: DO_TRANSACTION, amount }
}

export function reset() {
  return { type: RESET }
}

export function changeCurrency(currency) {
  return { type: CHANGE_CURRENCY, currency }
}
