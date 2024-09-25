import React from 'react';

//components
import Header from './components/Header';
import Footer from './components/Footer';


//pages
import Home from './pages/Home';
import HotelDetails from './pages/HotelDetails';
import BookingPage from './pages/BookingPage';
import Dashboard from './pages/Dashboard';
import ShowNavbar from './components/showNavbar';

// import Error from './pages/Error'; // Assuming you have an Error component

//react router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowFooter from './components/ShowFooter';

const App = () => {
  return (
    <Router>
      <ShowNavbar>
        <Header />
      </ShowNavbar>
      
      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/admin" element={<Dashboard />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
      {/* <Footer /> */}
      <ShowFooter>
        <Footer />
      </ShowFooter>
    </Router>
  );
};

export default App;
