import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'; // Correct imports
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/config'; 
import { toast } from 'react-toastify';
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from 'react-router-dom';
import ProductModal from './SingleBooking';
import ChangeBookingStatus from '../changeBookingStatus/ChangeBookingDetails';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = () => {
    setLoading(true);

    try {
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        const allBookings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setBookings(allBookings);
        setLoading(false);
      });

    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleEdit = (id) => {
    navigate.push(`/edit-booking/${id}`); // Navigate to the edit page with booking ID
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {loading && (
        <div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center'>
          <SpinnerDotted />
        </div>
      )}
      <main className='bg-white'>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8 xl:p-10 mt-2">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 font-bold text-black">
              All Hotel Bookings
            </h2>
          </div>

          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
            <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Booking Date</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Full Name</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Booking Number</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Booking Status</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Action</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {bookings.length > 0 ? bookings.map((booking, index) => {
                    const { id, bookingDate, bookingStatus, userAddress: { full_name } } = booking;
                    return (
                      <tr key={id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="text-sm leading-5 text-gray-800">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="text-sm leading-5 text-gray-800">{bookingDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="text-sm leading-5 text-blue-900">{full_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="text-sm leading-5 text-blue-900">{id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className={`text-sm leading-5 ${bookingStatus === 'Room Booked' ? 'text-green-500' :
                            bookingStatus === 'cancelled' ? 'text-red-500' :
                            bookingStatus === 'check-in' ? 'text-orange-500' :
                            bookingStatus === 'completed' ? 'text-blue-900' : 'text-gray-500'
                          }`}>
                            {bookingStatus}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                          <div className="flex space-x-3 mt-2">
                            <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                              onClick={() => openModal(booking)}>
                              View Details
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                         
                        <ChangeBookingStatus bookingId={booking.id} />
                      
                        </td>
                      </tr>
                    )
                  }) : (
                    <tr>
                      <td colSpan="6" className="text-center px-6 py-4 border-b border-gray-500">No bookings available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <ProductModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            booking={selectedBooking} // Pass the selected booking data to the modal
          />
        )}
      </main>
    </>
  );
};

export default Booking;
