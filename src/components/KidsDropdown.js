import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';

// Dummy data list for the dropdown
const list = [
  { name: '0 Kids' },
  { name: '1 Kid' },
  { name: '2 Kids' },
  { name: '3 Kids' },
  { name: '4 Kids' },
];

const KidsDropdown = () => {
  // Local state to manage selected number of kids
  const [kids, setKids] = useState('0 Kids'); // Default value is '0 Kids'

  return (
    <Menu as='div' className='w-full h-full bg-white relative'> 
      <Menu.Button className='w-full h-full flex items-center justify-between px-8'>
        {/* Display 'No Kids' if 0 is selected */}
        {kids === '0 Kids' ? 'No Kids' : kids}
        <BsChevronDown className='text-base text-accent-hover' />
      </Menu.Button>

      {/* Dropdown menu items */}
      <Menu.Items as='ul' className='bg-white absolute w-full flex flex-col z-40'>
        {list.map((li, index) => (
          <Menu.Item 
            onClick={() => setKids(li.name)} // Set the selected value
            as='li' 
            className='border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex justify-center items-center cursor-pointer' 
            key={index}>
            {li.name}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default KidsDropdown;
