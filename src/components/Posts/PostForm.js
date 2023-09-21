import React, { Component } from 'react';

export default class PostForm extends Component {
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
        isToggled: false,
        pageSlug: this.state.title.replace(/[\s_]/g, '-').toLowerCase(),
        bannerImage: "someImage",
        isPublished: true
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
      <div><div className="text-4xl font-bold mb-4 ml-4">POSTS</div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <form onSubmit={this.handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Title:</label>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Body:</label>
              <textarea
                name="body"
                value={this.state.body}
                onChange={this.handleInputChange}
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-32 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {this.props.selectedPostToEdit ? 'Update' : 'Add'}
            </button>
            {this.props.selectedPostToEdit && (
              <button
                type="button"
                onClick={this.handleCancel}
                className="w-32 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ml-2"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }
}
