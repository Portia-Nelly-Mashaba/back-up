import React, { useContext } from 'react';
import { useParams  } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { HotelContext } from '../context/HotelContext';

import AdultsDropdown from '../components/AdultsDropdown';
import KidsDropdown from '../components/KidsDropdown';
import CheckIn from '../components/CheckIn';
import CheckOut from '../components/CheckOut';


const HotelDetails = () => {
  const { hotels} = useContext(HotelContext)
  const { id } = useParams();
  console.log(id);
  return (
    <div className='bg-pink-200'>HotelDetails</div>
  )
};

export default HotelDetails;
