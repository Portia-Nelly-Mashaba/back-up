import React, { useState } from 'react';
import InfoBox from '../../infoBox/InfoBox';
import Chart from '../../chart/Chart';
import TotalRooms from '../../infoBox/TotalRooms';
import TotalBookings from '../../infoBox/TotalBookings';
import TotalUsers from '../../infoBox/TotalUsers';
import TotalBookingAmount from '../../infoBox/TotalBookingAmount';


const Dashboard = () => {

  
  return (
    <div className="mt-20 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <InfoBox 
          title={"Total Revenue"} 
        value= {<TotalBookingAmount />}
          percentage={"+55%"}
          gradientFrom={"blue-600"} 
          gradientTo={"blue-400"} 
          iconBgShadow={"blue-500/40"} 
          borderColor={"blue-gray-50"} 
          icon={
            // SVG for Total Revenue
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
              <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd"></path>
              <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
            </svg>
          }
        />
        <InfoBox 
          title={"Users"} 
          value={<TotalUsers />} 
          percentage={"+3%"}
          gradientFrom={"pink-600"} 
          gradientTo={"pink-400"} 
          iconBgShadow={"pink-500/40"} 
          borderColor={"blue-gray-50"} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd"></path>
            </svg>
          }
        />
        <InfoBox 
          title={"Total Bookings"} 
          value={<TotalBookings />} 
          percentage={"+5%"}
          gradientFrom={"green-600"} 
          gradientTo={"green-400"} 
          iconBgShadow={"green-500/40"} 
          borderColor={"blue-gray-50"} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path d="M19 3h-2V1h-2v2H7V1H5v2H3a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2zm0 18H3V8h16v13z"></path>
            </svg>
          }
        />
        <InfoBox 
          title={"Total Rooms"} 
          value={<TotalRooms />} 
          percentage={"+10%"}
          gradientFrom={"orange-600"} 
          gradientTo={"orange-400"} 
          iconBgShadow={"orange-500/40"} 
          borderColor={"blue-gray-50"} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <rect x="6" y="2" width="12" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
              <rect x="10" y="12" width="4" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="17" r="0.5" fill="currentColor" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
  <div className="col-span-12">
    <div
      className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-lg dark:border-strokedark dark:bg-boxdark sm:px-7.5"
    >
      <Chart />
    </div>
  </div>
</div>

    </div>
  );
};

export default Dashboard;
