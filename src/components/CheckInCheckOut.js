import React, { useState } from 'react';
// datepicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker.css';
import { BsCalendar } from 'react-icons/bs';

const CheckInCheckOut = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <div className="relative w-full h-full">
      {/* Toggle button for date pickers */}
      <div className="flex items-center justify-between cursor-pointer" onClick={toggleDatePicker}>
        <span>{startDate ? startDate.toLocaleDateString() : 'Check In'} - {endDate ? endDate.toLocaleDateString() : 'Check Out'}</span>
        <BsCalendar className="text-accent text-base" />
      </div>

      {/* Date pickers */}
      {showPicker && (
        <div className="absolute z-10 mt-2 bg-white p-4 rounded shadow-lg">
          {/* Check In */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Check In</label>
            <DatePicker
              className="w-full h-full"
              selected={startDate}
              placeholderText="Check In"
              onChange={(date) => setStartDate(date)}
            />
          </div>

          {/* Check Out */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Check Out</label>
            <DatePicker
              className="w-full h-full"
              selected={endDate}
              placeholderText="Check Out"
              onChange={(date) => setEndDate(date)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckInCheckOut;
