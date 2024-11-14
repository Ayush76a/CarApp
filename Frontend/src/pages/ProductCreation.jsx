import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCar } from '../services/api';

function ProductCreation() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages([...e.target.files]); // Store multiple files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
  
    images.forEach((image) => {
      formData.append('images', image);
    });
  
    try {
      await addCar(formData);
      navigate('/my-cars');
    } catch (error) {
      console.error('Failed to add car:', error);
    }
  };
  

  return (
    <div className="product-creation">
      <h2>Add Car</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          required
        />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

export default ProductCreation;
