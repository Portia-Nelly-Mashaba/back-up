import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ShowNavbar = ({ children }) => {
  const location = useLocation();

  const [showHeader, setShowHeader] = useState(true); // Default to showing the header

  useEffect(() => {
    console.log('Current location:', location);
    
    // Hide the header if the pathname is '/' or '/admin'
    if (location.pathname === '/' || location.pathname === '/admin') {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location]);

  return (
    <>
      <div>{showHeader && children}</div> {/* Conditionally render the header */}
    </>
  );
};

export default ShowNavbar;
