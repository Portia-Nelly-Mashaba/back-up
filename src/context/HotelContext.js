import React, { createContext, useEffect, useState } from 'react';
//data
import { hotelData } from '../data'; //import { hotelData, roomData } from '../data';

export const HotelContext = createContext();

const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState(hotelData);
  const [total, setTotal] = useState(0);
  const [adults, setAdults] = useState('1 Adult');
  const [kids, setKids] = useState('0 Kids');
  // console.log(Number(adults[0]));
  // console.log(Number(kids[0]));
  useEffect(() => {
    setTotal(Number(adults[0]) + Number(kids[0]));
  });
  //console.log(total);

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(total);
    // console.log(hotels);

    // filter hotel based on total [person]
    const newHotels = hotelData.filter( hotel => {
      return total <= hotel.maxPerson
    })
    setHotels(newHotels);
  };
  // console.log(hotels);
  

  return <HotelContext.Provider value={{ hotels, adults, setAdults, kids, setKids, handleClick }}>
    { children}
  </HotelContext.Provider>
};

export default HotelProvider;
