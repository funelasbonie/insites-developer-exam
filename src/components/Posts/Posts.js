import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './PostList';
import PostForm from './PostForm';
import PostDetails from './PostDetails';
import PostPublish from './PostPublish';

export default class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            selectedPostToEdit: null,
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

    togglePublish = (post) => {
        const updatedPosts = this.state.posts.map((p) => {
            if (p.id === post.id) {
                return { ...p, isPublished: !post.isPublished };
            }
            return p;
        });

        this.setState({
            posts: updatedPosts,
        });
    };

    render() {
        const { posts, selectedPostToEdit, isLoading } = this.state;

        const HomeComponent = <div>
            {isLoading ? (
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 md:w-full p-4">
                        <PostForm
                            addNewPost={this.addNewPost}
                            selectedPostToEdit={selectedPostToEdit}
                            editSelectedPost={this.editSelectedPost}
                            cancelEdit={this.cancelEdit}
                        />
                    </div>
                    <div className="lg:w-2/3 md:w-full p-4">
                        <PostList
                            posts={posts}
                            togglePosts={this.togglePost}
                            editPost={this.setSelectedPostToEdit}
                            deletePost={this.deletePost}
                        />
                    </div>
                </div>
            )}
        </div>

        return (
            <Router>
                <Routes>
                    <Route path="/" element={HomeComponent} />
                    <Route path="/view/:slug" element={<PostDetails posts={posts} />} />
                    <Route path="/publish/:slug" element={<PostPublish posts={posts} togglePublish={this.togglePublish} />} />
                </Routes>
            </Router>
        );
    }
}
