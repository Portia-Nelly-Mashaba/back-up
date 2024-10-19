import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/config';

const TotalRooms = () => {
    const [totalRooms, setTotalRooms] = useState(0);
  
    useEffect(() => {
      const fetchRooms = async () => {
        try {
          const roomsCollection = collection(db, 'rooms'); 
          const roomsSnapshot = await getDocs(roomsCollection);
          setTotalRooms(roomsSnapshot.docs.length); 
        } catch (error) {
          console.error("Error fetching rooms: ", error);
        }
      };
  
      fetchRooms();
    }, []);
  return (
    <div>
      {totalRooms} 
    </div>
  )
}

export default TotalRooms
