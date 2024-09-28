import React from 'react';
import { Menu } from '@headlessui/react';
import { BsLuggageFill, BsFillGeoAltFill } from 'react-icons/bs';

const list = [
  { name: 'Johannesburg' },
  { name: 'Pretoria' },
  { name: 'Durban' },
  { name: 'Cape Town' },
];

const DestinationDropdown = () => {
  return (
    <Menu as='div' className='w-full h-full bg-white relative'>
      <Menu.Button className='w-full h-full flex items-center justify-between px-8'>
        Destination
        <BsLuggageFill className='text-base text-accent-hover' />
      </Menu.Button>
      <Menu.Items as='ul' className='bg-white absolute w-full flex flex-col z-40 items-start'> {/* Align to the beginning (left) */}
        {list.map((li, index) => {
          return (
            <Menu.Item
              as='li'
              className='border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex justify-start items-center cursor-pointer' // Changed 'justify-end' to 'justify-start' for left alignment
              key={index}
            >
              <BsFillGeoAltFill className='mr-2' />
              {li.name}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default DestinationDropdown;
