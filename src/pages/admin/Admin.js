import React from 'react';
import Navbar from '../../components/admin/navbar.js/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../components/admin/home/Dashboard';
import Rooms from '../../components/admin/viewRooms/Rooms';
import SingleRoom from '../../components/admin/viewRooms/SingleRoom';
import AddRoom from '../../components/admin/rooms/AddRoom';
import Booking from '../../components/admin/bookings/Booking';
import ViewUsers from '../../components/admin/users/ViewUsers';
import AddForm from '../../components/admin/rooms/AddForm';



const Admin = () => {
  return (
    <>
    <div>
      <Navbar />
    </div>
    <div>
      <Routes>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='rooms' element={<Rooms />}/>
        <Route path='single-room' element={<SingleRoom />}/>
        <Route path='add-room' element={<AddRoom />}/>
        <Route path='bookings' element={<Booking />}/>
        <Route path='users' element={<ViewUsers />}/>
        <Route path='hotel-room/:id' element={<AddForm/>} />
      </Routes>
    </div>
  
  </>
  )
};

export default Admin;
