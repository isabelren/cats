import React from 'react';

class Post extends React.Component {

	render() {
		const details = this.props.details;
		return (
			<div className="post">
				<h3>{details.fact}</h3>
				<img src={details.url} alt="" className="catpic"/>
				<br></br>
				<button onClick={() => this.props.deletePost(details)}>Delete Cat</button>
			</div>
		)
	}
}

export default Post;