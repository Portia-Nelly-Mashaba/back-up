import React from 'react';
import Hotel from './Hotel';
import Img1 from '../assets/img/heroSlider/1.jpg';
import Img2 from '../assets/img/heroSlider/2.jpg';
import Img3 from '../assets/img/heroSlider/3.jpg';
//loader
import { SpinnerDotted } from 'spinners-react';

const Hotels = () => {
  // Dummy data for hotels
  const hotels = [
    {
      id: 1,
      name: "Hotel Grand",
      image: Img1,
      size: 40,
      maxPerson: 2,
      description: "A luxurious stay with a beautiful view. Enjoy your time at our grand hotel.",
      price: 1500,
    },
    {
      id: 2,
      name: "Sea Breeze Hotel",
      image: Img2,
      size: 50,
      maxPerson: 4,
      description: "A calm and serene getaway near the beach. Experience the sea breeze with us.",
      price: 2000,
    },
    {
      id: 3,
      name: "Mountain Lodge",
      image: Img3,
      size: 60,
      maxPerson: 6,
      description: "Stay in the mountains for an adventurous experience. Perfect for nature lovers.",
      price: 2500,
    },
  ];

  // Since there's no data fetching, we can set loading to false
  const loading = false;

  return (
    <section className='py-24'>
      {/* overlay & spinner */}
      {loading && (
        <div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center'>
          <SpinnerDotted />
        </div>
      )}
      <div className='container mx-auto lg:px-0'>
        <div className='text-center'>
          <div className='font-tertiary uppercase text-[15px] tracking-[6px]'>Explore South Africa</div>
          <h2 className='font-primary text-[35px] mb-4'>Popular Hotels</h2>
        </div>
        {/* grid */}
        <div className='grid grid-cols-1 max-w-sm max-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0'>
          {hotels.map((hotel) => (
            <Hotel hotel={hotel} key={hotel.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hotels;
