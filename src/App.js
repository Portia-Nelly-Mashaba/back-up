import React, { useState } from 'react';

//components
import Header from './components/Header';
import Footer from './components/Footer';


//pages
import Home from './pages/home/Home';
import HotelDetails from './pages/home/HotelDetails';
import BookingPage from './pages/home/BookingPage';
import Dashboard from './pages/admin/Dashboard';
import ShowNavbar from './components/showNavbar';
import BookingHistory from './pages/bookingHistory/BookingHistory';
import Contact from './pages/contact/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Saved from './pages/saved/Saved';
import Reset from './pages/auth/Reset';

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/booking/history" element={<BookingHistory />} />
        <Route path="/contact" element={<Contact />} />
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
