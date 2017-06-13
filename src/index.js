import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { Provider } from 'react-redux';
import rootReducer from './reducers/index';


const defaultState = {
	posts: []
}


const store = createStore(
	rootReducer, 
	defaultState, 
	applyMiddleware(
		thunkMiddleware
	)
);

render(
  <Provider store={store}>
  	<App/>
  </Provider>,
  document.getElementById('root')
);
