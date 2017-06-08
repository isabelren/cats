import React, { Component } from 'react';
import './App.css';
import Post from './Post';
import { getRandoFact, getRandoImage, sortByFactLength } from './helpers';

// Component: one post is an image plus a fact
// Component: list of posts
class App extends Component {
  constructor() {
    super();

    this.addPost = this.addPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.sortByFacts = this.sortByFacts.bind(this);

    this.state={
      posts:[],
      count: 0
    }
    for (let i = 0; i < 3; i++) {
      this.addPost();
    }
  }

  addPost = () => {
    let post = {};
    fetch('http://mapd-cats.azurewebsites.net/catpics')
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.text();
      })
      .then((text) => {
        const parseString = require('xml2js-parser').parseString;
        parseString(text, (err, result) => {
          post["url"] = result.response.data[0].images[0].image[1].url[0];

          post["fact"] = getRandoFact();
          post["name"] = "cat-" + this.state.count;
       
          this.setState({
            count: this.state.count + 1,
            posts: this.state.posts.concat([post])
          })
        })
      })
  }

  deletePost(e) {
    const array = this.state.posts.slice();
    const index = array.indexOf(e);
    array.splice(index, 1);
    this.setState({posts:array});
  }

  sortByFacts() {
    const array = this.state.posts.slice();
    array.sort(sortByFactLength);
    this.setState({posts: array});
  }

  render() {
    return (
      <div className="gallery">
        <button onClick={this.addPost}>+Add Cat</button>
        <button onClick={this.sortByFacts}>Sort by fact length</button>
        <ul className="list-of-posts">
          {
            this.state.posts.map((postval) => {
            return <Post key={postval.name} details={postval} deletePost={this.deletePost}/>
            })
          } 
        </ul>
      </div>
    );
  }
}


export default App;
