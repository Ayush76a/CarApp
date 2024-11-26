import React, { useEffect, useState } from 'react';
import { getCars } from '../services/api';
import CarCard from '../components/CarCard';

function ProductList() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await getCars();
        setCars(data);
        setFilteredCars(data); // Initialize filtered cars with all cars
      } catch (error) {
        console.error('Failed to fetch cars', error);
      }
    };
    fetchCars();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    setFilteredCars(
      cars.filter((car) =>
        car.title.toLowerCase().includes(searchValue)
      )
    );
  };

  return (
    <div className="container product-list">
      <h2>My Cars</h2>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <div className="car-card-container">
        {filteredCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
