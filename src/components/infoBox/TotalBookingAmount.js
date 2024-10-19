import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

const TotalBookingAmount = () => {
  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(() => {
    const fetchTotalBookingAmount = async () => {
      try {
        const bookingsCollection = collection(db, 'bookings');
        const q = query(bookingsCollection, where('bookingStatus', '!=', 'cancelled'));
        const snapshot = await getDocs(q);
        const total = snapshot.docs.reduce((sum, doc) => {
          const data = doc.data();
          return sum + (data.totalAmount || 0); 
        }, 0);

        setTotalAmount(total); 
      } catch (error) {
        console.error("Error fetching total booking amount: ", error);
      }
    };

    fetchTotalBookingAmount();
  }, [db]);

  return (
    <div>
      R {totalAmount.toFixed(2)}
    </div>
  );
};

export default TotalBookingAmount;
