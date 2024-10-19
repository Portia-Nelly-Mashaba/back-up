import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const TotalUsers = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const db = getFirestore(); // Initialize Firestore

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const usersCollection = collection(db, 'users'); // Reference to 'users' collection
        const snapshot = await getDocs(usersCollection); // Fetch all documents in 'users' collection
        setTotalUsers(snapshot.size); // Set total users as the number of documents
      } catch (error) {
        console.error("Error fetching total users: ", error);
      }
    };

    fetchTotalUsers();
  }, [db]);

  return (
    <div>
      {totalUsers}
    </div>
  );
};

export default TotalUsers;
