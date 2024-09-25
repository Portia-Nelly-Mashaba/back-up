import React, { useState, useEffect } from 'react';


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
        <a href='/'>
          {/* {Header ? <img src={Logo} /> : <img src={Logo} />} */}
          {/* <div className='text-accent sm:text-xl md:text-2xl lg:text-3xl'>
          <h1 className='w-[200px] text-[30px]'>Mzansi Stays</h1>
          </div> */}
          {header ? 
          (<h1 className='font-primary w-[200px] text-[30px] text-accent ' >Mzansi Stays</h1>) : 
          (<h1 className='font-primary w-[200px] text-[30px] text-white'>Mzansi Stays</h1>)
          }
          
        </a>
        {/* Nav */}
        <nav className={`${header ? 'text-primary' : 'text-white'} flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}>
          <a href='#' className='hover:text-accent transition'>
            Register
          </a>
          <a href='#' className='hover:text-accent transition'>
            Login
          </a>
        </nav>
      </div>
    </header>
  )
};

export default Header;
