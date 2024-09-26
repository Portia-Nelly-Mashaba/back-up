import React from 'react';

const date = new Date()
const year = date.getFullYear()

const Footer = () => {
  return (
    <footer className='bg-primary py-12'>
      <div className='container mx-auto text-white flex justify-between'>
      <a href='/book'>
        <h1 className='font-primary w-[200px] text-[30px] text-accent'>Mzansi Stays</h1>
      </a>
      Copyright &copy; {year}. All rights reserved.
      </div>
    
    </footer>
  )
};

export default Footer;
