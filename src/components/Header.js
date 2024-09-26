import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from '@headlessui/react'


const Header = () => {
  const [header, setHeader] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });
  });


  return (
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
        <NavLink to='/contact' className='hover:text-accent transition'>
            Contact Us
          </NavLink>
          <NavLink to='/register' className='hover:text-accent transition'>
            Register
          </NavLink>
          <NavLink to='/login' className='hover:text-accent transition'>
            Login
          </NavLink>

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
                  <NavLink to="/book" className="block px-4 py-2 text-sm hover:bg-accent/25  hover:text-black text-gray-700 data-[focus]:bg-gray-100">
                    Logout
                  </NavLink>
                </Menu.Item>
              </Menu.Items>
            </Menu>

        </nav>
      </div>
    </header>
  )
};

export default Header;
