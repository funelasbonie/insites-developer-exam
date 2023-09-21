import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostPublish({ posts, togglePublish }) {
    const { slug } = useParams();
    const navigate = useNavigate();

    const selectedPost = posts.find((post) => post.pageSlug === slug);

    if (!selectedPost) {
        return <div>Post not found</div>;
    }

    const handlePublishClick = () => {
        togglePublish(selectedPost);
        navigate('/');
    };

    return (
        <div>
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center h-full">
                <h1 className="text-xl font-semibold text-gray-800">Publish this Post?</h1>
                <h3 className="text-m font-semibold text-gray-800">{selectedPost.title}</h3>
                <div className="mt-5">
                    <button
                        onClick={handlePublishClick}
                        className={`w-32 bg-${selectedPost.isPublished ? 'gray' : 'blue'}-500 text-white py-2 px-4 rounded-lg hover:bg-${selectedPost.isPublished ? 'gray' : 'blue'
                            }-600 transition duration-300`}
                    >
                        {selectedPost.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostPublish;
