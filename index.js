'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import rootReducer from './reducers';
import App from './components/App';

// Local storage modules
import persistState, { mergePersistedState } from 'redux-localstorage';
import { serialize, deserialize } from 'redux-localstorage-immutable';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import Immutable from 'immutable';

const reducer = compose(
  mergePersistedState(deserialize)
)(rootReducer);

const storage = compose(
  serialize
)(adapter(window.localStorage));

const createPersistentStore = compose(
  persistState(storage, 'wallet')
)(createStore);

render(
  <Provider store={createPersistentStore(reducer)}>
    <App />
  </Provider>,
	document.getElementById('main')
);
