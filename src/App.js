import React, { Component } from 'react';
import './App.css';
import Post from './Post';
import {fetchPostsIfNeeded} from './actionCreators'
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }
  componentDidMount() {
    const { dispatch} = this.props
    dispatch(fetchPostsIfNeeded());
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(fetchPostsIfNeeded());
  }

  handleRefreshClick(e) {
    e.preventDefault();
    this.props.dispatch(fetchPostsIfNeeded());
  }

  render() {
    return (
        <div className="gallery">
          <button onClick={this.handleRefreshClick}>+Add Cat</button>
          <button onClick={this.props.sortByFacts}>Sort by fact length</button>
          <ul className="list-of-posts">
            {
              this.props.posts.map((postval, i) => {
              return <Post key={i} details={postval} deletePost={this.deletePost}/>
              })
            } 
          </ul>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { posts } = state
  const {
    isFetching,
    lastUpdated,
  } = {
    isFetching: true,
    posts: []
  }

  return {
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
//export default App;