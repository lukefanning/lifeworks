'use strict';

/*
 * Action types
 */

export const DO_TRANSACTION = 'DO_TRANSACTION';
export const RESET = 'RESET';

/*
 * Action functions
 */

export function doTransaction(amount) {
  return { type: DO_TRANSACTION, amount }
}

export function reset() {
  return { type: RESET }
}
