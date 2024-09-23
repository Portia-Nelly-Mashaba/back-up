import React from 'react';

const WebsiteFooter = () => {
  return (
    <footer className='bg-primary py-12'>
      <div className='container mx-auto text-white flex justify-between'>
      <a href='/'>
        <h1 className='font-primary w-[200px] text-[30px] text-accent'>Mzansi Stays</h1>
      </a>
      Copyright &copy; 2024. All rights reserved.
      Designed by Portia Mashaba
      </div>
    
    </footer>
  )
};

export default WebsiteFooter;
