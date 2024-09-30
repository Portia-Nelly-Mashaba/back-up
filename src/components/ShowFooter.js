import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ShowFooter = ({ children }) => {
  const location = useLocation();

  const [showFooter, setShowFooter] = useState(true); // Default to showing the header

  useEffect(() => {
    console.log('Current location:', location);
    
    // Hide the header if the pathname is '/' or '/admin'
    if (location.pathname === '/' || location.pathname === '/admin' || location.pathname === '/login'
        || location.pathname === '/register' || location.pathname === '/reset' || location.pathname === '/admin/dashboard'
        || location.pathname === '/admin/rooms' || location.pathname === '/admin/single-room' || location.pathname === '/admin/add-room'
        || location.pathname === '/admin/bookings' || location.pathname === '/admin/users' 
    ) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [location]);

  return (
    <>
      <div>{showFooter && children}</div> {/* Conditionally render the header */}
    </>
  );
};

export default ShowFooter;
