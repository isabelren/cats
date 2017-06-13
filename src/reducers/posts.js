import { getRandoFact, sortByFactLength } from '../helpers';

function posts(state = [], action) {
	console.log(state, action)
	switch (action.type) {
		case 'REMOVE_CAT':
			console.log(action)
			const index = state.indexOf(action.cat);
			return [
				...state.slice(0, index),
				...state.slice(index + 1)
			];
	
		case 'SORT_POSTS':
			if (state && state.length > 0) {
				const array = state.slice();
			    array.sort(sortByFactLength);
			    return array;
			}
		    	return state;
		case 'RECEIVE_PIC':
			if (!posts) {
				return [{fact:getRandoFact(), url:action.url}];
			}
			return [...state, {fact:getRandoFact(), url:action.url}];
		default:
			return state;
	}
}

export default posts;