import React, { Component } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import PostDetails from './PostDetails';
import PostPublish from './PostPublish';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            selectedPostToEdit: null,
            selectedPostToView: null,
            selectedPostToPublish: null,
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                const modifiedData = data.map((item) => ({
                    ...item,
                    isToggled: true,
                    pageSlug: item.title.replace(/[\s_]/g, '-').toLowerCase(),
                    bannerImage: "https://source.unsplash.com/user/c_v_r/1900x800",
                    isPublished: true
                }));

                console.log(modifiedData)
                this.setState({
                    posts: modifiedData,
                    isLoading: false
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                this.setState({ isLoading: false });
            });
    }

    addNewPost = (newPost) => {
        this.setState((prevState) => ({
            posts: [...prevState.posts, newPost],
        }));
    };

    setSelectedPostToEdit = (post) => {
        this.setState({ selectedPostToEdit: post });
    };

    editSelectedPost = (editedPost) => {
        const index = this.state.posts.findIndex(
            (post) => post.id === editedPost.id
        );

        if (index !== -1) {
            this.setState((prevState) => {
                const updatedPosts = [...prevState.posts];
                updatedPosts[index] = editedPost;
                return { posts: updatedPosts, selectedPostToEdit: null };
            });
        }
    };

    cancelEdit = () => {
        this.setState({ selectedPostToEdit: null });
    };

    deletePost = (postToDelete) => {
        const updatedPosts = this.state.posts.filter(
            (post) => post.id !== postToDelete.id
        );
        this.setState({
            posts: updatedPosts,
            selectedPostToEdit: null,
        });
    };

    togglePost = (postId) => {
        this.setState((prevState) => {
            const updatedPosts = prevState.posts.map((post) => {
                if (post.id === postId) {
                    return { ...post, isToggled: !post.isToggled };
                }
                return post;
            });
            return { posts: updatedPosts, selectedPostToEdit: null };
        });
    };

    setSelectedPostToView = (post) => {
        this.setState({
            selectedPostToView: post,
            selectedPostToEdit: null
        });
    };

    setSelectedPostToPublish = (post) => {
        this.setState({
            selectedPostToPublish: post,
            selectedPostToEdit: null
        });
    };

    togglePublish = (post) => {
        const updatedPosts = this.state.posts.map((p) => {
            if (p.id === post.id) {
                return { ...p, isPublished: !post.isPublished };
            }
            return p;
        });

        this.setState({
            posts: updatedPosts,
            selectedPostToPublish: null,
        });
    };

    clearSelectedPost = () => {
        this.setState({
            selectedPostToView: null,
            selectedPostToPublish: null,
        });
    };

    render() {
        const { posts, selectedPostToEdit, isLoading, selectedPostToView, selectedPostToPublish } = this.state;

        if (selectedPostToView) {
            return (
                <div>
                    <button onClick={this.clearSelectedPost} className="mb-2 text-m font-semibold text-blue-500">
                        <FontAwesomeIcon icon={faArrowLeft} className='mr-2' />
                        Back to Post List
                    </button>
                    <PostDetails post={selectedPostToView} />
                </div>
            );
        }

        if (selectedPostToPublish) {
            return (
                <div>
                    <button onClick={this.clearSelectedPost} className="mb-2 text-m font-semibold text-blue-500">
                        <FontAwesomeIcon icon={faArrowLeft} className='mr-2' />
                        Back to Post List
                    </button>
                    <PostPublish
                        post={selectedPostToPublish}
                        togglePublish={this.togglePublish}
                    />
                </div>
            );
        }

        return (
            <div>
                {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="flex">
                        <div className="w-1/3 p-4">
                            <PostForm
                                addNewPost={this.addNewPost}
                                selectedPostToEdit={selectedPostToEdit}
                                editSelectedPost={this.editSelectedPost}
                                cancelEdit={this.cancelEdit}
                            />
                        </div>
                        <div className="w-2/3 p-4">
                            <PostList
                                posts={posts}
                                togglePosts={this.togglePost}
                                editPost={this.setSelectedPostToEdit}
                                deletePost={this.deletePost}
                                viewPost={this.setSelectedPostToView}
                                togglePublish={this.setSelectedPostToPublish}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
