import React from 'react';

export default class PostList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="pr-4 bg-white h-screen overflow-y-auto">
        <ul>
          {this.props.posts.map((post) => (
            <li key={post.id} className="mb-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800 mr-5">{post.title}</h3>
                  <div className="w-16 flex justify-between items-center">
                    <button
                      onClick={() => this.props.editPost(post)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => this.props.deletePost(post)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{post.body}</p>
                <button
                  onClick={() => this.props.viewPost(post)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-2 block"
                >
                  View
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

}
