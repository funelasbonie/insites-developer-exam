import React, { Component } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';

export default class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            selectedPostToEdit: null
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                const modifiedData = data.map((item) => ({
                    ...item,
                    isToggled: true,
                }));
                this.setState({ posts: modifiedData });
            })
            .catch((error) => console.error('Error fetching data:', error));
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

    render() {
        const { posts, selectedPostToEdit } = this.state;

        return (
            <div>
                <div className="text-4xl font-bold mb-4 ml-4">POSTS</div>
                <div className="flex">
                    <div className="w-1/2 p-4">
                        <PostForm
                            addNewPost={this.addNewPost}
                            selectedPostToEdit={selectedPostToEdit}
                            editSelectedPost={this.editSelectedPost}
                            cancelEdit={this.cancelEdit}
                        />
                    </div>
                    <div className="w-1/2 p-4">
                        <PostList
                            posts={posts}
                            togglePosts={this.togglePost}
                            editPost={this.setSelectedPostToEdit}
                            deletePost={this.deletePost}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


