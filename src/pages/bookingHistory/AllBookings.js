import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { SpinnerDotted } from 'spinners-react';
import { db } from '../../firebase/config';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { selectBookingHistory, STORE_BOOKINGS } from '../../redux/slice/bookingSlice';
import { selectEmail } from '../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';


const AllBookings = () => {
  const [loading, setLoading] = useState(false);

  // Access bookings from Redux store
  const bookings = useSelector(selectBookingHistory);
  const userEmail = useSelector(selectEmail);

  const dispatch = useDispatch();
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

        // Dispatch the bookings data to Redux store
        dispatch(STORE_BOOKINGS(allBookings));
        setLoading(false);
      });

    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };


  const handleClick = (id) => {
    navigate(`/booking-details/${id}`);
  }

  const filteredBookings = bookings.filter((booking) => {
    //console.log("Filtering booking:", booking); 
    return booking.userEmail === userEmail; 
});

  return (
    <div>
      <main className='bg-white'>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
            <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
              <div className="flex justify-between">
                <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                  <div className="flex items-stretch w-full h-full mb-6 relative">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center leading-normal bg-transparent rounded border-none lg:px-3 py-2 text-grey-dark text-sm">
                        <svg width="18" height="18" className="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none">
                          <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                    <input type="text" className="flex-grow px-3 focus:outline-none text-xxs lg:text-xs text-gray-500" placeholder="Search" />
                  </div>
                </div>
              </div>
            </div>
            <div className="align-middle inline-block min-w-full shadow bg-white px-8 pt-3 rounded-bl-lg rounded-br-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">No</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Date</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">BookingId</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Amount</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Booking Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        <SpinnerDotted /> {/* Display spinner */}
                        Loading...
                      </td>
                    </tr>
                  ) : filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">No bookings found</td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking, index) => {
                      const { id, bookingDate, bookingTime, totalAmount, bookingStatus } = booking;
                      return (
                        
                        <tr key={id} onClick={() => handleClick(id)} className="cursor-pointer"> 
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div className="text-sm leading-5 text-gray-800">{index + 1}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div className="text-sm leading-5 text-blue-900">
                              {bookingDate} at {bookingTime}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div className="text-sm leading-5 text-blue-900">{id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div className="text-sm leading-5 text-blue-900">{"R"} {totalAmount}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div
                              className={`text-sm leading-5 ${bookingStatus === 'Room Booked' ? 'text-green-500' :
                                  bookingStatus === 'Cancelled' ? 'text-red-500' :
                                    bookingStatus === 'Check-In' ? 'text-orange-500' :
                                      bookingStatus === 'Completed' ? 'text-blue-900' : 'text-gray-500'
                                }`}
                            >
                              {bookingStatus}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AllBookings;
