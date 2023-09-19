import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class PostList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }; 
  }

  render() {
    const { posts } = this.props

    console.log(this.props.posts)
    console.log(this.state.truncatedPosts)

    posts.sort((a, b) => b.id - a.id)

    return (
      <div className="pr-4 pl-1 bg-white h-screen overflow-y-auto">
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800 mr-5">{post.title}</h3>
                  <div className="w-16 flex justify-end items-end gap-3">
                    <button
                      onClick={() => this.props.editPost(post)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => this.props.deletePost(post)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">
                  {post.isToggled
                    ? post.body.slice(0, 100) + '...'
                    : post.body}
                </p>
                {post.body.length > 100 && (
                  <p
                    onClick={() => this.props.togglePosts(post.id)}
                    className="text-blue-500 hover:underline cursor-pointer mt-2"
                  >
                    {post.isToggled ? 'Read More' : 'Show Less'}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
