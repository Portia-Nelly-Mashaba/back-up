import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/config';

const TotalBookings = () => {
    const [totalBookings, setTotalBookings] = useState(0);
  
    useEffect(() => {
      const fetchBookings = async () => {
        try {
          const bookingsCollection = collection(db, 'bookings'); 
          const bookingsSnapshot = await getDocs(bookingsCollection);
          setTotalBookings(bookingsSnapshot.docs.length); 
        } catch (error) {
          console.error("Error fetching bookings: ", error);
        }
      };
  
      fetchBookings();
    }, []);
  return (
    <div>
      {totalBookings} 
    </div>
  )
}

export default TotalBookings
