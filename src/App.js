import React from 'react';
//components
import Header from './components/Header';
import Footer from './components/Footer';
//pages
import Home from './pages/Home';
import HotelDetails from './pages/HotelDetails'
//react router
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import BookingPage from './pages/BookingPage';

const router = createBrowserRouter ([
  
  {
    path: '/',
    element: <Home />
  },
  {
    
    path: '/book',
    element: <BookingPage />
  },
  {
    path: '/hotel/:id',
    element: <HotelDetails />
  },
])

const App = () => {
  return (
    <div>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
};

export default App;
