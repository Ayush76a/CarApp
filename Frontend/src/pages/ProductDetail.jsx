import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCar, deleteCar } from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await getCar(id);
        setCar(data);
      } catch (error) {
        console.error('Failed to fetch car details', error);
      }
    };

    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteCar(id);
      navigate('/my-cars');
    } catch (error) {
      console.error('Failed to delete car', error);
    }
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <h2>{car.title}</h2>
      <p>{car.description}</p>

      {/* Display images */}
      <div className="image-gallery">
        {car.images && car.images.length > 0 ? (
          car.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5001${image}`} // Construct the image URL
              alt={`${car.title} ${index + 1}`}
              className="car-image"
            />
          ))
        ) : (
          <p>No images available for this car.</p>
        )}
      </div>

      <button
        onClick={handleDelete}
        className="delete-button"
      >
        Delete
      </button>
    </div>
  );
}

export default ProductDetail;
