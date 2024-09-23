import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
        <div className="hero-center h-[560px] relative flex justify-center items-center">
      <h1>Welcome to Our Hotel</h1>
      <p>Enjoy a luxurious stay at our hotel</p>
      <Link to="/book" className="btn btn-primary">
        Book Now
      </Link>
    </div>
    </section>
   
  
  
  )
};

export default Hero;
