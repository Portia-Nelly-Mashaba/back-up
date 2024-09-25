import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import AdultsDropdown from '../components/AdultsDropdown';
import KidsDropdown from '../components/KidsDropdown';
import CheckIn from '../components/CheckIn';
import CheckOut from '../components/CheckOut';
import ScrollToTop from '../components/ScrollToTop';

// Dummy data for hotels
const dummyHotels = [
  {
    id: 1,
    name: 'Hotel Example',
    description: 'A luxurious hotel with all the modern amenities you need.',
    facilities: [
      { name: 'Free Wi-Fi', icon: <FaCheck /> },
      { name: 'Swimming Pool', icon: <FaCheck /> },
      { name: 'Parking', icon: <FaCheck /> },
    ],
    imageLg: 'https://via.placeholder.com/600x400',
    price: 1200,
  },
  // Add more dummy hotels here as needed
];

const HotelDetails = () => {
  const { id } = useParams();
  
  // Replace HotelContext with dummy data
  const hotels = dummyHotels;

  // Get hotel by id
  const hotel = hotels.find((hotel) => {
    return hotel.id === Number(id);
  });

  // Destructure hotel data
  const { name, description, facilities, imageLg, price } = hotel;

  return (
    <section>
      <ScrollToTop />
      {/* banner */}
      <div className='bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center'>
        {/* overlay */}
        <div className='absolute w-full h-full bg-black/70'></div>
        {/* title */}
        <h1 className='text-6xl text-white z-20 font-primary text-center'>{name} Details</h1>
      </div>

      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row h-full py-24'>
          {/* left */}
          <div className='w-full h-full lg:w-[60%] px-6'>
            <h2 className='h2'>{name}</h2>
            <p className='mb-8'>{description}</p>
            <img className='mb-8' src={imageLg} alt='' />
            {/* facilities */}
            <div className='mt-12'>
              <h3 className='h3 mb-3'>Hotel facilities</h3>
              <p className='mb-12'>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,
                graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century.
              </p>
              <div className='grid grid-cols-3 gap-6 mb-12'>
                {/* grid */}
                {facilities.map((item, index) => {
                  const { name, icon } = item;
                  return (
                    <div className='flex items-center gap-x-3 flex-1' key={index}>
                      <div className='text-2xl text-accent'>{icon}</div>
                      <div className='text-base'>{name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* right */}
          <div className='w-full h-full lg:w-[40%]'>
            {/* reservation */}
            <div className='py-8 px-6 bg-accent/25 mb-12'>
              <div className='flex flex-col space-y-4 mb-4'>
                <h3>Your Reservation</h3>
                <div className='h-[60px]'>
                  <CheckIn />
                </div>
                <div className='h-[60px]'>
                  <CheckOut />
                </div>
                <div className='h-[60px]'>
                  <AdultsDropdown />
                </div>
                <div className='h-[60px]'>
                  <KidsDropdown />
                </div>
              </div>
              <button className='btn btn-lg btn-primary w-full'>Book Now For R{price}</button>
            </div>
            {/* rules */}
            <div>
              <h3 className='h3'>Hotel Rules</h3>
              <p className='mb-3'>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.
              </p>
              <ul className='flex flex-col gap-y-4'>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  Check-In: 3:00 PM - 9:00 PM
                </li>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  Check-Out: 10:30 AM
                </li>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  No Pets
                </li>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  No Smoking in the apartment
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelDetails;
