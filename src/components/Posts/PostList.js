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
            <li key={post.id}>
              <span>{post.title}</span>
              <button onClick={() => this.props.viewPost(post)}>View</button>
              <button onClick={() => this.props.editPost(post)}>Edit</button>
              <button onClick={() => this.props.deletePost(post)}>Delete</button>              
            </li>
          ))}
        </ul>
      </div>
    );
  }

}
