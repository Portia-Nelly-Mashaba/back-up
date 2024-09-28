import React from 'react';
import Hotels from '../../components/Hotels';
import BookForm from '../../components/BookForm';
import HeroSlider from '../../components/HeroSlider';
import AdminOnlyRoute from '../../components/adminOnlyRoute/AdminOnlyRoute';
// import Explore from '../components/Explore';
// import Offers from '../components/Offers'

const BookingPage = () => {
  return (
    <>
      <HeroSlider />
      <div className='container mx-auto relative'>
        <div className='bg-accent/20 mt-4 p-4 lg:shadow-xl lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12'>
          <BookForm />
          <AdminOnlyRoute />
        </div>
      </div>
      {/* <Offers />
      <Explore /> */}
      <Hotels />
    
    </>
  )
};

export default BookingPage;
