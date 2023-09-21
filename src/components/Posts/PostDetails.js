import React from 'react';

export default function PostDetails({ post }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <img
                src={post.bannerImage}
                alt={`Banner for ${post.title}`}
                className="w-full mb-4"
            />
            <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
            <p className="text-gray-600">{post.body}</p>
        </div>
    );
}
