import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ShowFooter = ({ children }) => {
  const location = useLocation();

  const [showFooter, setShowFooter] = useState(true); // Default to showing the header

  useEffect(() => {
    console.log('Current location:', location);
    
    // Hide the header if the pathname is '/' or '/admin'
    if (location.pathname === '/' || location.pathname === '/admin') {
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
