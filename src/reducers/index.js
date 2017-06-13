import { combineReducers } from 'redux';

import posts from './posts';

function isFetching(state=false, action) {
	switch (action.type) {
		case 'REQUEST_PIC':
			return Object.assign({}, state, {
		    	isFetching: true
		    })
		case 'RECEIVE_PIC':
			return Object.assign({}, state, {
		        isFetching: false
		    })
		default:
			return state;
	}
}

const rootReducer = combineReducers({posts, isFetching});

export default rootReducer;