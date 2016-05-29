'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducers from './reducers'
import App from './components/App'

// TODO HTML5 local storage for persistence

render(
  <Provider store={createStore(Reducers)}>
	  <App />
  </Provider>,
	document.getElementById('main')
);
