import React, { createContext, useEffect, useState } from 'react';
//data
import { hotelData, roomData } from '../data';

export const HotelContext = createContext();

const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState(hotelData)
  console.log(hotels);
  return <HotelContext.Provider value={{ hotels }}>
    { children}
  </HotelContext.Provider>
};

export default HotelProvider;
