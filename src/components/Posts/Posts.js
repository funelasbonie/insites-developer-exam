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

    addNewPost = (newPost) => {        
        this.setState((prevState) => ({
          posts: [...prevState.posts, newPost],
        }));
      };

    render() {
        const { posts, selectedPost } = this.state;
        
        return (
            <div>                
                <PostForm addNewPost={this.addNewPost} />
                <PostDetails post={selectedPost} />
                <PostList posts={posts} setSelectedPost={this.setSelectedPost} />
            </div>
        );
    }
}

export default Posts;
