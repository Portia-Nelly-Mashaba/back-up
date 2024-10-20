import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker.css';
import { BsCalendar } from 'react-icons/bs';

const CheckIn = ({ onChange, excludeDates }) => {
  const [startDate, setStartDate] = useState(null); // Default value

  const handleChange = (date) => {
    setStartDate(date);
    onChange(date); // Call the onChange prop
  };

  return (
    <div className='relative flex items-center justify-end h-full'>
      <div className='absolute z-10 pr-8'>
        <BsCalendar className='text-accent text-base' />
      </div>
      <DatePicker
        className='w-full h-full'
        selected={startDate}
        placeholderText='Check In'
        onChange={handleChange}
        excludeDates={excludeDates} // Exclude booked dates without changing the layout
      />
    </div>
  );
};

export default CheckIn;

// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import '../datepicker.css';
// import { BsCalendar } from 'react-icons/bs';

// const CheckIn = ({ onChange }) => {
//   const [startDate, setStartDate] = useState(null); // Default value

//   const handleChange = (date) => {
//     setStartDate(date);
//     onChange(date); // Call the onChange prop
//   };

//   return (
//     <div className='relative flex items-center justify-end h-full'>
//       <div className='absolute z-10 pr-8'>
//         <BsCalendar className='text-accent text-base' />
//       </div>
//       <DatePicker
//         className='w-full h-full'
//         selected={startDate}
//         placeholderText='Check In'
//         onChange={handleChange} />
//     </div>
//   );
// };

// export default CheckIn;


