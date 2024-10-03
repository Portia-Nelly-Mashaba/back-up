import React, { useState } from 'react';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import KidsDropdown from './KidsDropdown';
import AdultsDropdown from './AdultsDropdown';

const BookForm = () => {
  const [adults, setAdults] = useState('1 Adult'); // Default value
  const [kids, setKids] = useState('0 Kids'); // Default value
  const handleClick = (e) => {
    e.preventDefault();
    // Handle the click event here
    console.log(`Adults: ${adults}, Kids: ${kids}`);
  };

  return (
    <form className='h-[300px] w-full lg:h-[70px]'>
      <div className='flex flex-col w-full h-full lg:flex-row'>
        {/* <div className='flex-1 border-r'>
          <DestinationDropdown />
        </div> */}
        <div className='flex-1 border-r'>
          <CheckIn />
        </div>
        <div className='flex-1 border-r'>
          <CheckOut />
        </div>
        <div className='flex-1 border-r'>
          <AdultsDropdown setAdults={setAdults} />
        </div>
        <div className='flex-1 border-r'>
          <KidsDropdown setKids={setKids} />
        </div>
        <button 
          onClick={handleClick} 
          type='submit' 
          className='btn btn-primary'>
          Check Now
        </button>
      </div>
    </form>
  );
};

export default BookForm;

