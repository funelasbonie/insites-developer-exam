import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUpload, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default class PostList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      postsPerPage: 3,
    };
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { posts } = this.props;
    const { currentPage, postsPerPage } = this.state;

    const sortedPosts = [...posts].sort((a, b) => b.id - a.id);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
    console.log("currentPosts: ", currentPosts)

    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
    const maxButtons = 6;

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(startPage + maxButtons - 1, totalPages);

    if (totalPages - endPage < Math.floor(maxButtons / 2)) {
      startPage = Math.max(1, startPage - (Math.floor(maxButtons / 2) - (totalPages - endPage)));
    }

    return (
      <div className="pt-2 pr-4 pl-1 bg-white">
        <div className='flex-wrap'>
          <div className="flex-grow flex-nowrap">
            <div className="mb-4 flex justify-end items-center space-x-2">
              {currentPage > 1 && (
                <button
                  onClick={() => this.handlePageChange(currentPage - 1)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg"
                >
                  &lt;
                </button>
              )}

              {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                const page = startPage + index;
                return (
                  <button
                    key={page}
                    onClick={() => this.handlePageChange(page)}
                    className={`${currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                      } px-2 py-1 rounded-lg`}
                  >
                    {page}
                  </button>
                );
              })}

              {currentPage < totalPages && (
                <button
                  onClick={() => this.handlePageChange(currentPage + 1)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg"
                >
                  &gt;
                </button>
              )}
            </div>
          </div>
        </div>
        <ul>
          {currentPosts.map((post) => (
            <li key={post.id} className="mb-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <span className={`px-2 py-1 text-sm font-semibold text-white ${post.isPublished ? "bg-blue-500" : "bg-gray-500"} rounded-lg`}>
                  {post.isPublished ? "Published" : "Unpublished"}
                </span>
                <div className="flex justify-between items-center">
                  <h3 className={`mt-2 text-xl font-semibold mr-5 ${post.isPublished ? 'text-blue-500' : 'text-gray-800 '}`}>
                    {post.isPublished ? <Link to={`/view/${post.pageSlug}`}>{post.title}</Link> : post.title}
                  </h3>
                  <div className="mt-3 w-16 flex flex-grow justify-end items-end gap-3">
                    <button className={`text-${post.isPublished ? 'gray' : 'blue'}-500 hover:text-${post.isPublished ? 'grey' : 'blue'}-700`}>
                      <Link to={`/publish/${post.pageSlug}`}>
                        <FontAwesomeIcon icon={post.isPublished ? faDownload : faUpload} />
                      </Link>
                    </button>
                    <button
                      onClick={() => this.props.editPost(post)}
                      className="text-yellow-500 hover:text-yellow-700"
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
                {
                  post.isPublished
                    ? (
                      <div>
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
                    )
                    : null
                }
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
