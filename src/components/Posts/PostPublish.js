import React from 'react';

export default class PostPublish extends React.Component {
    render() {
        const { post, togglePublish } = this.props;

        return (
            <div>
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center h-full ">
                    <h1 className="text-xl font-semibold text-gray-800">Publish this Post?</h1>
                    <h3 className="text-m font-semibold text-gray-800">{post.title}</h3>
                    <div className="mt-5">
                        <button
                            onClick={() => togglePublish(post)}
                            className={`w-32 bg-${post.isPublished ? 'gray' : 'blue'}-500 text-white py-2 px-4 rounded-lg hover:bg-${post.isPublished ? 'gray' : 'blue'}-600 transition duration-300`}
                        >
                            {post.isPublished ? 'Unpublish' : 'Publish'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
