import React from 'react';
import Hotels from '../components/Hotels';
import BookForm from '../components/BookForm';
// import Explore from '../components/Explore';
// import Offers from '../components/Offers'

const Home = () => {
  return (
    <div>
      <BookForm />
      {/* <Offers />
      <Explore /> */}
      <Hotels />
    </div>
  )
};

export default Home;
