import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendar } from 'react-icons/bs';

const CheckOut = ({ onChange, excludeDates }) => {
  const [endDate, setEndDate] = useState(null);

  const handleChange = (date) => {
    setEndDate(date);
    onChange(date);
  };

  return (
    <div className='relative flex items-center justify-end h-full'>
      <div className='absolute z-10 pr-8'>
        <BsCalendar className='text-accent text-base' />
      </div>
      <DatePicker
        className='w-full h-full'
        selected={endDate}
        placeholderText='Check Out'
        onChange={handleChange}
        excludeDates={excludeDates}  // Disable booked dates
      />
    </div>
  );
};

export default CheckOut;


// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import '../datepicker.css';
// import { BsCalendar } from 'react-icons/bs';

// const CheckOut = ({ onChange }) => {
//   const [endDate, setEndDate] = useState(null); // Default value

//   const handleChange = (date) => {
//     setEndDate(date);
//     onChange(date); // Call the onChange prop
//   };

//   return (
//     <div className='relative flex items-center justify-end h-full'>
//       <div className='absolute z-10 pr-8'>
//         <BsCalendar className='text-accent text-base' />
//       </div>
//       <DatePicker
//         className='w-full h-full'
//         selected={endDate}
//         placeholderText='Check Out'
//         onChange={handleChange} />
//     </div>
//   );
// };

// export default CheckOut;


