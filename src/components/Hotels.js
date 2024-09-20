import React, { useContext } from 'react';
import { HotelContext } from '../context/HotelContext';
import Hotel from './Hotel';

const Hotels = () => {
  const { hotels } = useContext(HotelContext);

  return (
    // <div>
    //   <h1>Deals for the weekend</h1>
    //   <p>Save on stays for September 27 - September 29</p>
    // </div>
    <section className='py-24'>
      <div className='container mx-auto lg:px-0'>
        <div className='grid grid-cols-1 max-w-sm max-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0'>
        { hotels.map((hotel) => {
          console.log(hotel);
          return <Hotel hotel={hotel} key={hotel.id}/>;
        })}
        </div>
        
      </div>
    </section>
  )
};

export default Hotels;
