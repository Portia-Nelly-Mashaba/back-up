import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react'
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from './hiddenLink/HiddenLinks';
import { AdminOnlyLink } from './adminOnlyRoute/AdminOnlyRoute';
// import AdminOnlyRoute, { AdminOnlyLink } from './adminOnlyRoute/AdminOnlyRoute';


const Header = () => {
  const [header, setHeader] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const navigate = useNavigate()

  const dispatch = useDispatch();

  // Monitor currently signed-in user
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      if (!user.displayName) {
        const u1 = user.email.split('@')[0]; // Get email prefix
        const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
        setDisplayName(uName);
      } else {
        setDisplayName(user.displayName);
      }

      // Dispatch the active user to Redux
      dispatch(SET_ACTIVE_USER({
        email: user.email,
        userName: user.displayName ? user.displayName : displayName,
        userID: user.uid,
      }));
    } else {
      setDisplayName(""); // Reset if no user
      dispatch(REMOVE_ACTIVE_USER());
    }
  });
}, [dispatch, displayName]); 

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });
  });


 const logoutUser = () => {
  signOut(auth).then(() => {
    toast.success('Logout Successfully')
    // window.alert('Logout Successfully');
    navigate('/book')
  }).catch((error) => {
    toast.error('Error logging out: ' + error.message )
    // window.alert('Error logging out: ' + error.message);
  });
 }

  return (
   <> 
   {/* <ToastContainer /> */}
    <header 
      className={ `${ 
      header ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8'} fixed z-50 w-full transition-all duration-500`}>
      <div className='container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0'>
        <NavLink to='/book'>
          {/* {Header ? <img src={Logo} /> : <img src={Logo} />} */}
          {/* <div className='text-accent sm:text-xl md:text-2xl lg:text-3xl'>
          <h1 className='w-[200px] text-[30px]'>Mzansi Stays</h1>
          </div> */}
          {header ? 
          (<h1 className='font-primary w-[200px] text-[30px] text-accent ' >Mzansi Stays</h1>) : 
          (<h1 className='font-primary w-[200px] text-[30px] text-white'>Mzansi Stays</h1>)
          }
          
        </NavLink>
        {/* Nav */}
        <nav className={`${header ? 'text-primary' : 'text-white'} flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}>
        
        {/* <button className='btn btn-lg btn-primary mx-auto'>{btnText}</button>  */}

          <ShowOnLogout>
          <NavLink to='/register' className='hover:text-accent transition'>
            Register
          </NavLink>
          <NavLink to='/login' className='hover:text-accent transition'>
            Login
          </NavLink>
          <NavLink to='/login' className='hover:text-accent transition'>
            Saved
          </NavLink>
          </ShowOnLogout>

          <AdminOnlyLink>
          <NavLink to='/admin/dashboard' className='btn btn-sm btn-primary mx-auto rounded'>
            Admin
          </NavLink>
          </AdminOnlyLink>

          <NavLink to='/contact' className='hover:text-accent transition'>
            Contact Us
          </NavLink>

          <ShowOnLogin>
          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </Menu.Button>
              
              </div>
             
              <Menu.Items
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <Menu.Item>
                  <NavLink to="/book" className="block px-4 py-2 text-sm hover:bg-accent/25  hover:text-black text-gray-700 data-[focus]:bg-gray-100">
                    Manage Account
                  </NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to="/book" className="block px-4 py-2 text-sm hover:bg-accent/25  hover:text-black text-gray-700 data-[focus]:bg-gray-100">
                    Booking History
                  </NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to="/book" className="block px-4 py-2 text-sm hover:bg-accent/25  hover:text-black text-gray-700 data-[focus]:bg-gray-100">
                    Rewards
                  </NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to="/book" className="block px-4 py-2 text-sm hover:bg-accent/25  hover:text-black text-gray-700 data-[focus]:bg-gray-100">
                    Reviews
                  </NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to="/book" className="block px-4 py-2 text-sm hover:bg-accent/25  hover:text-black text-gray-700 data-[focus]:bg-gray-100">
                    Saved
                  </NavLink>
                </Menu.Item>
                <Menu.Item>
                  <NavLink to="/" onClick={logoutUser} className="block px-4 py-2 text-sm hover:bg-accent/25  hover:text-black text-gray-700 data-[focus]:bg-gray-100">
                    Logout
                  </NavLink>
                </Menu.Item>
              </Menu.Items>
            </Menu>

            <NavLink to='/book' className=' text-accent hover:text-white transition'>
            {displayName || 'Guest'}
          </NavLink>
          </ShowOnLogin>

        </nav>
      </div>
    </header>
    </>
  )
};

export default Header;
