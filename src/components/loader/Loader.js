import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Loader = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a loading process (similar to what you have in HotelContext.js)
    setTimeout(() => {
      // After 3 seconds, loading is done
      setLoading(false);
    }, 3000);
  };

  return ReactDOM.createPortal(
    <div>
      <button onClick={handleClick}>Load Data</button>
      {loading ? <p>Loading...</p> : <p>Data Loaded!</p>}
    </div>,
    document.getElementById('loader')
  );
};

export default Loader;
