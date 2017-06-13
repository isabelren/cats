import React, { Component } from 'react';
import './App.css';
import Post from './Post';
import * as actionCreators from './actionCreators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.sortByFacts= this.sortByFacts.bind(this);
  }
  componentDidMount() {
    this.props.fetchPosts();
  }

  handleChange(nextSubreddit) {
    this.props.fetchPosts();
  }

  handleAddClick(e) {
    e.preventDefault();
    this.props.fetchPosts();
  }

  sortByFacts(e) {
    e.preventDefault();
    this.props.sortByFacts();
  }

  render() {
    return (
        <div className="gallery">
          <button onClick={this.handleAddClick}>+Add Cat</button>
          <button onClick={this.sortByFacts}>Sort by fact length</button>
          <ul className="list-of-posts">
            {
              this.props.posts.map((postval, i) => {
              return <Post key={i} details={postval} {...this.props}/>
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

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(App)
//export default App;