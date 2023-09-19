import React, { Component } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import PostDetails from './PostDetails';

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            selectedPost: null,
            selectedPostToEdit: null,
            isPostDetailsVisible: false,
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => this.setState({ posts: data }))
            .catch((error) => console.error('Error fetching data:', error));
    }



    setSelectedPost = (post) => {
        this.setState({ selectedPost: post });
    };




    viewPost = (post) => {
        this.setState({
            selectedPost: post,
            isPostDetailsVisible: !this.state.isPostDetailsVisible,
        });
    };



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
                return { posts: updatedPosts, selectedPost: null };
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
            selectedPost: null,
            selectedPostToEdit: null,
            isPostDetailsVisible: false,
        });
    };

   

    render() {
        const { posts, selectedPost, selectedPostToEdit, isPostDetailsVisible } = this.state;

        return (
            <div>
                {isPostDetailsVisible && <PostDetails post={selectedPost} />}
                <PostForm
                    addNewPost={this.addNewPost}
                    // selectedPostToEdit
                    selectedPostToEdit={selectedPostToEdit}
                    editSelectedPost={this.editSelectedPost}
                    cancelEdit={this.cancelEdit}
                />
                <PostList
                    posts={posts}
                    setSelectedPost={this.setSelectedPost}
                    editPost={this.setSelectedPostToEdit}
                    deletePost={this.deletePost}
                    viewPost={this.viewPost}
                />
            </div>
        );
    }
}

export default Posts;
