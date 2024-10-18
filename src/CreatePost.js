import React, { useState } from 'react';

function CreatePost({ addPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let imageUrl = null;
    if (image) {
      // In a real app, you'd upload the image to a server here
      // and get back a URL. For now, we'll use a local object URL.
      imageUrl = URL.createObjectURL(image);
    }

    addPost({ 
      id: Date.now(), // temporary ID
      title, 
      content, 
      imageUrl,
      author: 'Current User', // You'd get this from your auth system
      date: new Date().toISOString()
    });
    
    // Reset form
    setTitle('');
    setContent('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="create-post">
      <h2>Create a New Post</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here..."
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      {image && (
        <div className="image-preview">
          <h4>Image Preview:</h4>
          <img src={URL.createObjectURL(image)} alt="Preview" />
        </div>
      )}
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePost;