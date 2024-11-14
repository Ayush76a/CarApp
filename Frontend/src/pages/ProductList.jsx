import React, { useEffect, useState } from 'react';
import { getCars } from '../services/api';
import CarCard from '../components/CarCard';

function ProductList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await getCars();
        setCars(data);
      } catch (error) {
        console.error('Failed to fetch cars', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h2>My Cars</h2>
      {cars.map((car) => (
        <CarCard key={car._id} car={car} />
      ))}
    </div>
  );
}

export default ProductList;
