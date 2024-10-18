import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/config';

const BookingReview = () => {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(3);
    const { id } = useParams();

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const bookingDoc = doc(db, 'bookings', id);
                const bookingData = await getDoc(bookingDoc);
                if (bookingData.exists()) {
                    console.log('Booking data:', bookingData.data());
                    setBooking(bookingData.data());
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching booking data: ', error);
            }
        };
        fetchBooking();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!booking) {
        return <div>Booking not found.</div>;
    }

    const {
        bookingDate,
        checkInDate,
        checkOutDate,
        roomType,
        roomNo,
        adults,
        kids,
        numberOfNights,
        totalAmount,
        bookingStatus,
    } = booking;

    const handleRatingClick = (index) => {
        setRating(index);
    };
    return (
        <div>
            <section className="pt-32 py-24 relative">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 md:col-span-8 md:pr-8 md:border-r border-gray-200">
                            <div className="flex max-sm:flex-col items-center justify-between mb-3">
                                <h3 className="font-manrope font-bold text-2xl leading-9 text-black">Rate This Room Hotel</h3>
                                <p className="font-medium text-lg leading-8 text-gray-500">Booking # {id}</p>
                            </div>
                            <div className="flex max-sm:flex-col items-center justify-between mb-12">
                                <p className="font-manrope text-xl leading-10 text-black">Room Details: {roomType} </p>
                                <p className="font-manrope text-xl leading-10 text-black">Room No: {roomNo} </p>
                            </div>

                            <div className="mb-12">
                                <h4 className="font-manrope font-bold text-xl leading-8 text-black">Rating:</h4>
                                <div className="flex items-center mt-2">
                                    {/* Medium Stars */}
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`cursor-pointer text-3xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                                            onClick={() => handleRatingClick(star)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Move the review section here */}
                            <div className="mb-12">
                                <h3 className="font-manrope font-bold text-2xl leading-9 text-black">Write a review</h3>
                                <div className="flex flex-col items-center w-full max-w-sm max-sm:mx-auto">
                                    <textarea
                                        name="review"
                                        id="review"
                                        cols="30"
                                        rows="5"
                                        className="py-3 px-4 mb-16 rounded-2xl border border-gray-300 w-full h-[283px] resize-none font-normal text-base leading-7 placeholder:text-gray-400 text-gray-900 outline-0 max-sm:mx-auto"
                                        placeholder="Enter a description...">
                                    </textarea>
                                    <button className="rounded-full py-3 px-5 text-center bg-indigo-600 text-white font-semibold text-base w-full max-w-sm shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-300">Submit Rating</button>
                                </div>
                            </div>

                        </div>
                       
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BookingReview;
