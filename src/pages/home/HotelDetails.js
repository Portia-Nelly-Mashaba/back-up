
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { FaBath, FaCheck, FaCoffee, FaDumbbell, FaHeart, FaMugHot, FaParking, FaShareAlt, FaStar, FaSwimmingPool, FaWifi } from 'react-icons/fa';

import AdultsDropdown from '../../components/AdultsDropdown.js';
import KidsDropdown from '../../components/KidsDropdown.js';
import CheckIn from '../../components/CheckIn.js';
import CheckOut from '../../components/CheckOut.js';
import ScrollToTop from '../../components/ScrollToTop.js';
import { collection, doc, getDoc, getDocs, where } from 'firebase/firestore';
import { db } from '../../firebase/config.js';
import Review from '../../components/Review.js';
import { query } from 'express';

const HotelDetails = () => {
  const [room, setRoom] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numberOfAdults, setNumberOfAdults] = useState(1); 
  const [numberOfKids, setNumberOfKids] = useState(0); 
  const { id } = useParams();

  useEffect(() => {
    const fetchRoomAndBookings = async () => {
      try {
        const roomDoc = doc(db, 'rooms', id); // Fetch room by ID
        const roomData = await getDoc(roomDoc);

        if (roomData.exists()) {
          setRoom(roomData.data());

          // Fetch bookings for this room
          const bookingsQuery = query(collection(db, 'bookings'), where('roomId', '==', id));
          const bookingsSnapshot = await getDocs(bookingsQuery);
          const bookings = bookingsSnapshot.docs.map(doc => doc.data());

          // Convert booked date ranges into an array of individual dates
          const allBookedDates = [];
          bookings.forEach((booking) => {
            let currentDate = new Date(booking.checkInDate.toDate());
            const endDate = new Date(booking.checkOutDate.toDate());

            while (currentDate <= endDate) {
              allBookedDates.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
            }
          });
          
          setBookedDates(allBookedDates); // Save booked dates
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room data: ', error);
      }
    };

    fetchRoomAndBookings();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!room) {
    return <div>Room not found.</div>;
  }

  // Destructure hotel details
  const { imageURL, room_type, desc, amenities, amount, people, room_no } = room;

  // Calculate the number of nights
  const calculateNumberOfNights = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const timeDifference = checkOutDate - checkInDate;
      return Math.max(0, Math.ceil(timeDifference / (1000 * 3600 * 24))); // Days between dates
    }
    return 0;
  };

  // Calculate number of nights
  const numberOfNights = calculateNumberOfNights(checkInDate, checkOutDate);

  // Calculate total based on the number of adults and kids
  const baseRoomRate = amount * numberOfNights; // Base cost for the room for the nights booked
  const extraPersonFee = (numberOfAdults + numberOfKids > people) ? (numberOfAdults + numberOfKids - people) * 20 : 0; // Assuming $20 for each extra person
  const serviceCharge = 30; // Fixed service charge
  const totalBeforeTax = baseRoomRate + extraPersonFee + serviceCharge; // Total before tax

  // Assuming a tax rate of 10%
  const taxRate = 0.10;
  const taxAmount = totalBeforeTax * taxRate;

  // Total amount to pay
  const totalAmount = totalBeforeTax + taxAmount;

  // Check if total people do not exceed room capacity
  const isValidReservation = (numberOfAdults + numberOfKids) <= people;


  return (
    <section>
      <ScrollToTop />
      {/* banner */}
      <div className='bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center'>
        {/* overlay */}
        <div className='absolute w-full h-full bg-black/70'></div>
        {/* title */}
        <h1 className='text-6xl text-white z-20 font-primary text-center'>{room_type} Details</h1>
      </div>

      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row h-full py-24'>
          {/* left */}
          <div className='w-full h-full lg:w-[60%] px-6'>
            <h2 className='h2'>{room_type}</h2>
            <p className='mb-8'>{desc}</p>
            <img className='mb-8' src={imageURL} alt='' />

            {/* facilities */}
            <div className='mt-12'>
              <h3 className='h3 mb-3'>Hotel facilities</h3>
              <p className='mb-12'>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,
                graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century
                who is thought to have scrambled parts of
              </p>
              <div className='grid grid-cols-3 gap-6 mb-12'>
                {/* grid */}
                {Object.entries(amenities).map(([key, value], index) => {
                  if (value) { // Only show the amenity if it's true
                    let icon;
                    let name;

                    // Assign icons and names based on the key (amenity name)
                    switch (key) {
                      case 'bath':
                        icon = <FaBath />; // Example icon for bath
                        name = 'Bath';
                        break;
                      case 'breakfast':
                        icon = <FaCoffee />; // Example icon for breakfast
                        name = 'Breakfast';
                        break;
                      case 'coffee':
                        icon = <FaMugHot />; // Example icon for coffee
                        name = 'Coffee';
                        break;
                      case 'gym':
                        icon = <FaDumbbell />; // Example icon for gym
                        name = 'Gym';
                        break;
                      case 'parking':
                        icon = <FaParking />; // Example icon for parking
                        name = 'Parking';
                        break;
                      case 'swimming':
                        icon = <FaSwimmingPool />; // Example icon for swimming pool
                        name = 'Swimming Pool';
                        break;
                      case 'wifi':
                        icon = <FaWifi />; // Example icon for Wi-Fi
                        name = 'Wi-Fi';
                        break;
                      default:
                        return null; // Skip if no matching case
                    }

                    return (
                      <div className='flex items-center gap-x-3 flex-1' key={index}>
                        <div className='text-2xl text-accent'>{icon}</div>
                        <div className='text-base'>{name}</div>
                      </div>
                    );
                  }
                  return null; // Skip if the value is false
                })}
                <div>
                </div>
              </div>

            </div>
          </div>
          {/* right */}
          <div className='w-full h-full lg:w-[40%]'>
            {/* reservation */}
            <div className='py-8 px-6 bg-accent/25 mb-12'>
              <div className='flex flex-col space-y-4 mb-4'>
                <h3>Your Reservation</h3>
                <div className='h-[60px]'>
                <CheckIn onChange={(date) => setCheckInDate(date)} excludeDates={bookedDates} />
                </div>
                <div className='h-[60px]'>
                <CheckOut onChange={(date) => setCheckOutDate(date)} excludeDates={bookedDates} />
                </div>
                <div className='h-[60px]'>
                <CheckIn onChange={(date) => setCheckInDate(date)} excludeDates={bookedDates} />
                </div>
                <div className='h-[60px]'>
                  <AdultsDropdown onChange={(count) => setNumberOfAdults(count)} />
                </div>
                <div className='h-[60px]'>
                  <KidsDropdown onChange={(count) => setNumberOfKids(parseInt(count.charAt(0)))} />
                </div>

                <p>Total: R{totalAmount}</p>

                {/* Only show button if both check-in and check-out dates are provided */}
                {checkInDate && checkOutDate ? (
                  isValidReservation ? (
                    <NavLink to={`/booking-summary/${id}`} state={{
                      id,
                      roomType: room_type,
                      description: desc,
                      imageURL: imageURL,
                      amount: amount,          // Make sure 'amount' is correctly retrieved
                      roomNo: room_no,
                      numberOfNights,
                      totalAmount,
                      checkInDate,
                      checkOutDate,
                      adults: numberOfAdults,
                      kids: numberOfKids
                    }}>
                      <button className='btn btn-lg btn-primary w-full mt-4'>Proceed to Summary</button>
                    </NavLink>
                  ) : (
                    <p className="text-red-500">Total number of guests exceeds room capacity!</p>
                  )
                ) : (
                  <p className="text-red-500">Please select check-in and check-out dates to proceed.</p>
                )}
              </div>
            </div>


            {/* rules */}
            <div>
              <h3 className='h3'>Hotel Rules</h3>
              <p className='mb-3'>
                Lorem ipsum, or lipsum as it is sometimes known,
                is dummy text used in laying out print, graphic or web designs.
              </p>
              <ul className='flex flex-col gap-y-4'>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  Check-In: 3:00 PM - 9:00 PM
                </li>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  Check-Out: 10:30 AM
                </li>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  No Pets
                </li>
                <li className='flex items-center gap-x-4'>
                  <FaCheck className='text-accent' />
                  No Smoking in the apartment
                </li>
              </ul>
            </div>


            <div className="flex justify-between items-center mt-12">
              <div className="text-2xl text-accent">
                <Review/>
              </div>

            
              <div className="flex items-center space-x-6 text-2xl text-accent">
                <FaShareAlt  />
                <FaHeart className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};



export default HotelDetails;



