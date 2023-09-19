import React, { Component } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import PostDetails from './PostDetails';

export default class Posts extends Component {
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
            selectedPost: null,
            selectedPostToEdit: null,
            isPostDetailsVisible: false,
        });
    };



    render() {
        const { posts, selectedPost, selectedPostToEdit, isPostDetailsVisible } = this.state;

        console.log(posts)

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
                        {isPostDetailsVisible && <PostDetails post={selectedPost} />}
                        <PostList
                            posts={posts}
                            setSelectedPost={this.setSelectedPost}
                            editPost={this.setSelectedPostToEdit}
                            deletePost={this.deletePost}
                            viewPost={this.viewPost}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


