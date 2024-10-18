import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AllBookings from "./AllBookings";

const BookingHistory = () => {
  // State to manage the visibility of each section
  const [activeSection, setActiveSection] = useState("All Bookings");

  // Function to toggle between sections
  const toggleSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex flex-col min-h-screen"> 
      <section className="py-24 relative flex-grow"> 
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">
            Booking History
          </h2>
          <p>
            Open a booking to leave a <b>Room Review</b>
          </p>

          <div className="flex sm:flex-col lg:flex-row sm:items-center justify-between">
            <ul className="flex max-sm:flex-col sm:items-center gap-x-14 gap-y-3">
              <li
                className={`font-medium text-lg leading-8 cursor-pointer ${
                  activeSection === "All Bookings"
                    ? "text-indigo-600"
                    : "text-black"
                } transition-all duration-500 hover:text-indigo-600`}
                onClick={() => toggleSection("All Bookings")}
              >
                All Bookings
              </li>
              <li
                className={`font-medium text-lg leading-8 cursor-pointer ${
                  activeSection === "Upcoming Bookings"
                    ? "text-indigo-600"
                    : "text-black"
                } transition-all duration-500 hover:text-indigo-600`}
                onClick={() => toggleSection("Upcoming Bookings")}
              >
                Upcoming Bookings
              </li>
              <li
                className={`font-medium text-lg leading-8 cursor-pointer ${
                  activeSection === "Completed Stays"
                    ? "text-indigo-600"
                    : "text-black"
                } transition-all duration-500 hover:text-indigo-600`}
                onClick={() => toggleSection("Completed Stays")}
              >
                Completed Stays
              </li>
              <li
                className={`font-medium text-lg leading-8 cursor-pointer ${
                  activeSection === "Cancelled Bookings"
                    ? "text-indigo-600"
                    : "text-black"
                } transition-all duration-500 hover:text-indigo-600`}
                onClick={() => toggleSection("Cancelled Bookings")}
              >
                Cancelled Bookings
              </li>
            </ul>

            <div className="text-center mt-7">
              <NavLink to='/book'>
              <button
              className="bg-accent text-white font-medium py-3 px-6 rounded-full hover:bg-accent transition-all duration-300"
            >
              New Booking
            </button>
              </NavLink>
            
          </div>
          </div>

          <div className="mt-7 border border-gray-300 pt-9">
            {activeSection === "All Bookings" && (
              <div>
                <AllBookings />
              </div>
            )}
            {activeSection === "Upcoming Bookings" && (
              <div>
                {/* Upcoming Bookings content */}
                <p className="font-medium text-lg leading-8 text-black">
                  Displaying upcoming bookings.
                </p>
              </div>
            )}
            {activeSection === "Completed Stays" && (
              <div>
                {/* Completed Stays content */}
                <p className="font-medium text-lg leading-8 text-black">
                  Displaying completed stays.
                </p>
              </div>
            )}
            {activeSection === "Cancelled Bookings" && (
              <div>
                {/* Cancelled Bookings content */}
                <p className="font-medium text-lg leading-8 text-black">
                  Displaying cancelled bookings.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default BookingHistory;
