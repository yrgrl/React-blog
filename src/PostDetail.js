import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail({ posts, deletePost }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) return <div>Post not found</div>;

  const handleDelete = () => {
    deletePost(post.id);
    navigate('/');
  };

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="post-image " />
      )}
      <p>{post.content}</p>
      <div className="post-meta">
        <span>By {post.author}</span>
        <span>Posted on {new Date(post.date).toLocaleDateString()}</span>
        <button onClick={handleDelete}>Delete Post</button>
      </div>
    </div>
  );
}

export default PostDetail;