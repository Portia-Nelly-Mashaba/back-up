import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../../firebase/config';
import { toast } from 'react-toastify';


const ProductModal = ({ isOpen, onClose, booking }) => {
  const [activeTab, setActiveTab] = useState('booking');
  const [bookingDetails, setBookingDetails] = useState(booking);

  if (!isOpen || !booking) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const bookingRef = doc(db, 'bookings', bookingDetails.id); 

    try {
      // Update the document in Firestore
      await updateDoc(bookingRef, {
        bookingStatus: bookingDetails.bookingStatus,
        // Add other fields you want to update as necessary
        roomNo: bookingDetails.roomNo,
        roomType: bookingDetails.roomType,
        adults: bookingDetails.adults,
        kids: bookingDetails.kids,
        numberOfNights: bookingDetails.numberOfNights,
      });
      console.log('Booking updated successfully');
      toast.success('Status has been updated Successfully')
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating booking: ", error);
      toast.error(error)
    }
  };

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden={!isOpen}
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-3xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Booking Details
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="flex border-b">
            <button
              className={`py-2 px-4 ${activeTab === 'booking' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'} focus:outline-none`}
              onClick={() => setActiveTab('booking')}
            >
              Booking Details
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'confirmation' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'} focus:outline-none`}
              onClick={() => setActiveTab('confirmation')}
            >
              Confirmation Details
            </button>
          </div>

          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            {activeTab === 'booking' ? (
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="roomNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Room No
                  </label>
                  <input type="text" value={bookingDetails.roomNo} name="roomNo" id="roomNo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="roomType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Room Type
                  </label>
                  <input type="text" value={bookingDetails.roomType} name="roomType" id="roomType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="adults" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Adults
                  </label>
                  <input type="number" value={bookingDetails.adults} name="adults" id="adults" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="kids" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Kids
                  </label>
                  <input type="number" value={bookingDetails.kids} name="kids" id="kids" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} />
                </div>

                <div className="col-span-2">
                  <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Booking Id
                  </label>
                  <input type="text" value={bookingDetails.id} name="id" id="id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="numberOfNights" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Number Of Nights
                  </label>
                  <input type="number" value={bookingDetails.numberOfNights} name="numberOfNights" id="numberOfNights" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={handleChange} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="bookingStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Booking Status</label>
                  <select id="bookingStatus" name="bookingStatus" value={bookingDetails.bookingStatus} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <option value="Room Booked">Booked</option>
                    <option value="cancelled">Cancel</option>
                    <option value="check-in">Check-In</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Update Booking
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <h4 className="text-lg font-semibold">Confirmation Details</h4>
                <div className="">
                  <div>
                    <strong>Full Name:</strong> {booking.userAddress.full_name}
                  </div>
                  <div>
                    <strong>Address:</strong> {booking.userAddress.address} {booking.userAddress.code}
                  </div>
                  <div>
                    <strong>Country:</strong> {booking.userAddress.country}
                  </div>
                  <div>
                    <strong>Id Number:</strong> {booking.userAddress.id_no}
                  </div>
                  <div>
                    <strong>Phone Number:</strong> {booking.userAddress.phone_no}
                  </div>
                  <div>
                    <strong>Booked Email:</strong> {booking.userAddress.email}
                  </div>
                  <div>
                    <strong>Check-In Date:</strong>
                    {booking.checkInDate ? (
                      new Date(booking.checkInDate).toLocaleDateString('en-US')
                    ) : (
                      "No Check-In Date Provided"
                    )}
                  </div>
                  <div>
                    <strong>Check-Out Date:</strong>
                    {booking.checkOutDate ? (
                      new Date(booking.checkOutDate).toLocaleDateString('en-US')
                    ) : (
                      "No Check-Out Date Provided"
                    )}
                  </div>
                  <div>
                    <strong>Booked Date:</strong> {booking.bookingDate} at {booking.bookingTime}
                  </div>
                  <div>
                    <strong>Status:</strong> {booking.bookingStatus}
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
