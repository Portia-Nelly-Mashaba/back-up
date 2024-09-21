import React from 'react';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import KidsDropdown from './KidsDropdown';
import AdultsDropdown from './AdultsDropdown';
import { useContext } from 'react';
import { HotelContext } from '../context/HotelContext';

const BookForm = () => {
  const {handleClick } = useContext(HotelContext);
  return (
    <form className='h-[300px] w-full lg:h-[70px]'>
      <div className='flex flex-col w-full h-full lg:flex-row'>
        <div className='flex-1 border-r'>
          <CheckIn />
        </div>

        <div className='flex-1 border-r'>
          <CheckOut />
        </div>

        <div className='flex-1 border-r'>
          <AdultsDropdown />
        </div>

        <div className='flex-1 border-r'>
          <KidsDropdown />
        </div>
        {/* button */}
        <button 
          onClick={(e) => handleClick(e)} 
          type='submit' 
          className='btn btn-primary'>
            Check Now
        </button>

      </div>
    </form>
  )
};

export default BookForm;
