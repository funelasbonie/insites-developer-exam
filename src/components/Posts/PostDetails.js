import React from 'react';

export default class PostDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h2>Post Details</h2>
                {this.props.post ? (
                    <div>
                        <h3>{this.props.post.title}</h3>
                        <p>{this.props.post.body}</p>                        
                    </div>
                ) : (
                    <p>Select a post to view details.</p>
                )}
            </div>
        );
    }
}

