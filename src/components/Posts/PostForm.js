import React, { Component } from 'react';

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title: this.state.title,
      body: this.state.body,
    };

    this.props.addNewPost(newPost);

    this.setState({
      title: '',
      body: '',
    });
  };

  render() {
    return (
      <div>
        <h2>Post Form</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Body:</label>
            <textarea
              name="body"
              value={this.state.body}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit">Add Post</button>
        </form>
      </div>
    );
  }
}
