import React, { Component } from 'react';
import './App.css';
import Post from './Post';
import { getRandoFact, getRandoImage } from './helpers';

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
    for (var i = 0; i < 3; i++) {
      this.addPost();
    }

  }

  addPost() {
      var post = {};
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
    var array = this.state.posts.slice();
    var index = array.indexOf(e);
    array.splice(index, 1);
    this.setState({posts:array});
  }

  sortByFacts() {
    const array = this.state.posts.slice();
    const newArr = array.sort(function(a, b) {
      return (a.fact.length > b.fact.length) ? 1 : ((b.fact.length > a.fact.length) ? -1 : 0);
    }); 
    this.setState({posts: newArr});
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


 // renderImage(imageUrl) {
 //    return (
 //      <div>
 //        <img src={imageUrl} alt=""/>
 //      </div>
 //    );
 //  }
  // render() {
  //   return (
  //     <div className="gallery">
  //       <div className="images">
  //         {this.props.imageUrls.map(imageUrl => this.renderImage(imageUrl))}
  //       </div>
  //     </div>
  //   );
  // }