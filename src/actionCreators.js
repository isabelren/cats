require('es6-promise').polyfill();
require('isomorphic-fetch');

//add a cat
export function addCat(){
	return {
		type:'ADD_CAT',
	}
}

//remove cat
export function removeCat(cat) {
	return {
		type: 'REMOVE_CAT',
		cat
	}

}
//sort by fact length
export function sortByFacts() {
	return {
		type: 'SORT_POSTS'
	}
}

export function requestPic() {
	return {
		type: 'REQUEST_PIC'
	}
}

export function receivePic(url) {
	return {
		type: 'RECEIVE_PIC',
		url: url,
		receivedAt: Date.now()
	}
}

export function fetchPosts() {
	return function (dispatch) {
		dispatch(requestPic());

		return fetch('http://mapd-cats.azurewebsites.net/catpics')
		      .then(function(response) {
		        if (response.status >= 400) {
		          throw new Error("Bad response from server");
		        }
		        return response.text();
		      })
		      .then((text) => {
		        const parseString = require('xml2js-parser').parseString;
		        parseString(text, (err, result) => {
		          const urlText = result.response.data[0].images[0].image[1].url[0];
		          dispatch(receivePic(urlText));
		          /*return [
					...state.slice(), 
					{url:urlText, fact:getRandoFact()}
				  ];*/
		          	
		        })
		      })
	}
}

export function shouldFetchPosts(state) {
	const posts = state.posts
	/*if (!posts) {
		return true;
	} else if (state.isFetching) {
		return false;
	} else {
		return true;
	}*/
	return true
}

export function fetchPostsIfNeeded() {
	
	return (dispatch, getState) => {
		if (shouldFetchPosts(getState())) {
			
			//dispatch a thunk from thunk!
			return dispatch(fetchPosts());
		} else {
			return Promise.resolve();
		}
	}
}
