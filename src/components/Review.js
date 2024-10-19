import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import StarsRating from 'react-star-rate';

const Review = () => {
  const [room, setRoom] = useState(null); // Store room details
  const [reviews, setReviews] = useState([]); // Store reviews
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0); // Store average rating
  const { id } = useParams();  // Room ID from URL params

  useEffect(() => {
    const fetchRoomAndReviews = async () => {
      try {
        // Fetch room details by room ID
        const roomDoc = doc(db, 'rooms', id);
        const roomData = await getDoc(roomDoc);
        if (roomData.exists()) {
          setRoom(roomData.data());
          console.log('Room data:', roomData.data());
        } else {
          console.log('Room not found');
        }

        // Fetch reviews from the reviews collection where room ID matches
        const reviewsQuery = query(collection(db, 'reviews'), where('roomId', '==', id)); // roomId is in the 'reviews' collection
        const reviewsSnapshot = await getDocs(reviewsQuery);
        const reviewsList = reviewsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (reviewsList.length > 0) {
          console.log('Fetched reviews:', reviewsList);
          setReviews(reviewsList);

          // Calculate the average rating
          const totalRating = reviewsList.reduce((sum, review) => sum + review.rate, 0);
          const avgRating = (totalRating / reviewsList.length).toFixed(1); // Calculate the average
          setAverageRating(avgRating);
        } else {
          console.log('No reviews found for this room');
          setAverageRating(0); // Set rating to 0 if no reviews found
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching room or reviews:', error);
        setLoading(false);
      }
    };

    fetchRoomAndReviews();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!room) {
    return <div>Room not found.</div>;
  }


  return (
    <div>
      {averageRating > 0 ? (
        <div>
          <p>Rating: {averageRating}</p>
          <StarsRating value={averageRating} />
        </div>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default Review;
