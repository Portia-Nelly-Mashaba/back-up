import React, { createContext, useEffect, useState } from 'react';
//data
import { hotelData } from '../data'; //import { hotelData, roomData } from '../data';

export const HotelContext = createContext();

const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState(hotelData);
  const [total, setTotal] = useState(0);
  const [adults, setAdults] = useState('1 Adult');
  const [kids, setKids] = useState('0 Kids');
  const [loading, setLoading] = useState(false);
  // console.log(Number(adults[0]));
  // console.log(Number(kids[0]));
  useEffect(() => {
    setTotal(Number(adults[0]) + Number(kids[0]));
  });
  //console.log(total);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(total);
    // console.log(hotels);

    // filter hotel based on total [person]
    const newHotels = hotelData.filter( hotel => {
      return total <= hotel.maxPerson
    });
    setTimeout(() => {
      setHotels(newHotels);
      setLoading(false);
    }, 3000);
    
  };
  // console.log(hotels);
  

  return <HotelContext.Provider value={{ hotels, adults, setAdults, kids, setKids, handleClick, loading }}>
    { children}
  </HotelContext.Provider>
};

export default HotelProvider;
