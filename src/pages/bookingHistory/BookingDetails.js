import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';

const BookingDetails = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleCancel = () => {
    // Implement cancellation functionality here
    console.log('Cancel clicked');
  };

  const handleReview = () => {
    navigate(`/review-booking/${id}`);
  };

  return(

  <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <section className="py-24 flex-grow">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">Booking Details</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <Link to="/booking-history" className="flex items-center gap-2">
              <span className="text-indigo-600 font-semibold text-lg transition-all duration-300 hover:text-indigo-800">
                &larr; Go Back To Booking History
              </span>
            </Link>
          </div>

          <div className="mt-7 border border-gray-300 pt-9">
            <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
              <div className="data">
                <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">Booking ID: #{id}</p>
                <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">Booking Amount: {'R'} {totalAmount}</p>
                <div className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                  Booking Status:
                  <span className={`ml-2 ${bookingStatus === 'Room Booked' ? 'text-green-500' :
                    bookingStatus === 'Cancelled' ? 'text-red-500' :
                      bookingStatus === 'Check-In' ? 'text-orange-500' :
                        bookingStatus === 'Completed' ? 'text-blue-900' : 'text-gray-500'
                  }`}>
                    {bookingStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex max-md:flex-col items-center justify-between p-4">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">No</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Booking Date</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Room Type</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Room No</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Check-In</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Check-Out</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Adults</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Kids</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Nights</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">1</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{bookingDate}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{roomType}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{roomNo}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{checkInDate.toDate().toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{checkOutDate.toDate().toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{adults}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{kids}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{numberOfNights}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                          &#x22EE;
                        </Menu.Button>
                        <Transition
                          as={React.Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={handleCancel}
                                    className={`${
                                      active ? 'bg-gray-100' : ''
                                    } block px-4 py-2 text-sm text-red-500 w-full text-left`}
                                  >
                                    Cancel
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={handleReview}
                                    className={`${
                                      active ? 'bg-gray-100' : ''
                                    } block px-4 py-2 text-sm text-blue-500 w-full text-left`}
                                  >
                                    Review
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingDetails;