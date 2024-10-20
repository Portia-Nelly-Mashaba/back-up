import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../../firebase/config';
import { toast } from 'react-toastify';


const ChangeBookingStatus = ({ bookingId }) => { 
    const [loading, setLoading] = useState(false);

    const editBooking = async (newStatus) => {
        setLoading(true);
        try {
            const bookingRef = doc(db, 'bookings', bookingId); 
            await updateDoc(bookingRef, {
                bookingStatus: newStatus,
            });

            toast.success('Booking status updated successfully')
           
        } catch (error) {
            console.error("Error updating booking status: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
    {loading && <div>Loading...</div>}
    <div className="flex space-x-3 mt-2">
        
        {/* Check-In Icon with Tooltip */}
        <div className="relative group">
            <svg
                onClick={() => editBooking('check-in')}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500 hover:text-yellow-700 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            > 
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a7.003 7.003 0 00-5-6.708V4a1 1 0 00-2 0v.292A7.003 7.003 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 p-1 bg-gray-700 text-white text-sm rounded hidden group-hover:block">
                Check-In
            </div>
        </div>

        {/* Cancel Icon with Tooltip */}
        <div className="relative group">
            <svg
                onClick={() => editBooking('cancelled')}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 p-1 bg-gray-700 text-white text-sm rounded hidden group-hover:block">
                Cancel
            </div>
        </div>

        {/* Completed Icon with Tooltip */}
        <div className="relative group">
            <svg
                onClick={() => editBooking('completed')}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 hover:text-green-700 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <div className="absolute  mt-1 p-1 bg-gray-700 text-white text-sm rounded hidden group-hover:block">
                Check-out
            </div>
        </div>
    </div>
</>

);
};

export default ChangeBookingStatus;