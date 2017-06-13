import { getRandoFact, sortByFactLength } from '../helpers';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const initialState = {
	posts: []
}

function posts(state = [], action) {
	console.log(state, action);
	switch (action.type) {
		case 'ADD_CAT':
			console.log("Adding");
			return Object.assign({}, state, {
		        isFetching: true,
	      		});
			
		case 'REMOVE_CAT':
		    const index = state.posts.indexOf(action.cat);
			return {posts:[
				...state.posts.slice(0, index),
				...state.posts.slice(index + 1)
			]};
	
		case 'SORT_POSTS':
			if (state.posts && state.posts.length > 0) {
				const array = state.posts.slice();
			    array.sort(sortByFactLength);
			    return {posts:array};
			}
		    	return state;
		case 'RECEIVE_PIC':
			if (!state.posts) {
				[{fact:getRandoFact(), url:action.url}];
			}
			return [...state, {fact:getRandoFact(), url:action.url}];
		default:
			return state;
	}
}

export default posts;