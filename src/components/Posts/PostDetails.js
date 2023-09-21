import React from 'react';
import { useParams } from 'react-router-dom';

export default function PostDetails({ posts }) {

    const { slug } = useParams();

    const post = posts.find((post) => post.pageSlug === slug);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <img
                src={post.bannerImage}
                alt={`Banner for ${post.title}`}
                className="w-full mb-4"
            />
            <span className={`px-1 py-1 text-xs font-semibold text-white ${post.isPublished ? "bg-blue-500" : "bg-gray-500"} rounded-lg`}>
                {post.isPublished ? "Published" : "Unpublished"}
            </span>
            <h1 className="text-2xl font-semibold">{post.title}</h1>
            <p className="text-gray-600 mt-4">{post.body}</p>
        </div>
    );
}
