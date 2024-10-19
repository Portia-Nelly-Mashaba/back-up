import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import StarsRating from "react-star-rate";
import { toast } from "react-toastify";
import { selectEmail } from "../../redux/slice/authSlice";
import { db } from "../../firebase/config";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = useSelector(selectEmail); // Fetch the logged-in user's email

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const reviewsQuery = query(collection(db, "reviews"), where("userEmail", "==", userEmail));
        const reviewsSnapshot = await getDocs(reviewsQuery);
        const reviewsList = reviewsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(reviewsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user reviews: ", error);
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, [userEmail]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteDoc(doc(db, "reviews", reviewId));
      toast.success("Review deleted successfully!");
      setReviews(reviews.filter((review) => review.id !== reviewId)); // Remove deleted review from state
    } catch (error) {
      toast.error("Failed to delete review: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Your Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-item">
            <h4>Room: {review.roomType}</h4>
            <p>Room No: {review.roomNo}</p>
            <p>
              Rating: {review.rate}/5 <StarsRating value={review.rate} />
            </p>
            <p>{review.review}</p>
            <p>Reviewed on: {review.reviewDate}</p>
            <button onClick={() => handleDeleteReview(review.id)}>Delete Review</button>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default UserReviews;
