import React from 'react';

export default class PostList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    } 
  }

  render() {
    return (
      <div>
        <h2>Post List</h2>
        <ul>
          {this.props.posts.map((post) => (
            <li key={post.id} onClick={() => this.props.setSelectedPost(post)}>
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    );  
  }
  
}
