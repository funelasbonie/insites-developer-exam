import React, { Component } from 'react';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };
  }

  componentDidUpdate(prevProps) {    
    if (prevProps.selectedPostToEdit !== this.props.selectedPostToEdit) {
      const { title, body } = this.props.selectedPostToEdit || { title: '', body: '' };
      this.setState({
        title,
        body,
      });
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCancel = () => {
    this.props.cancelEdit();
    this.setState({
      title: '',
      body: '',
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.props.selectedPostToEdit) {
      this.props.editSelectedPost({
        ...this.props.selectedPostToEdit,
        title: this.state.title,
        body: this.state.body,
      });
    } else {
      const newPost = {
        id: Date.now(),
        title: this.state.title,
        body: this.state.body,
      };

      this.props.addNewPost(newPost);
    }

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
          <button type="submit">
            {this.props.selectedPostToEdit ? 'Edit Post' : 'Add Post'}
          </button>
          {this.props.selectedPostToEdit && (
            <button type="button" onClick={this.handleCancel}>
              Cancel
            </button>
          )}
        </form>
      </div>
    );
  }
}

export default PostForm;
