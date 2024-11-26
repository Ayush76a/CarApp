import React from 'react';
import { Link } from 'react-router-dom';
import carImage from '../assets/car-image.jpg'; // Add the image to your assets folder

function Home() {
  return (
    <div className="home" style={{ textAlign: 'center', padding: '20px' }}>
      {/* Title Section */}
      <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>
        Welcome to Car Management App
      </h1>
      <br></br>
      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '20px' }}>
        Manage all your cars in one place! Sign up or log in to start managing
        your car listings.
      </p>
      <br></br>

      {/* Image Section */}
      <div style={{ marginBottom: '20px' }}>
        <img
          src={carImage}
          alt="Car Management"
          style={{
            width: '100%',
            maxWidth: '400px', // Adjusted size for better fit
            height: 'auto',
            borderRadius: '10px',
            margin: '0 auto',
          }}
        />
      </div>

      {/* Buttons Section */}
      <div style={{ marginTop: '20px' }}>
        <Link
          to="/login"
          style={{
            marginRight: '10px',
            padding: '10px 20px',
            background: '#007BFF',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
          }}
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={{
            padding: '10px 20px',
            background: '#28A745',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
          }}
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Home;
