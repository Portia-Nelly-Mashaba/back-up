import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';

const list = [
  { name: '1 Adult' },
  { name: '2 Adults' },
  { name: '3 Adults' },
  { name: '4 Adults' },
];

const AdultsDropdown = ({ onChange }) => {
  const [adults, setAdults] = useState('1 Adult'); // Default value

  const handleChange = (name) => {
    setAdults(name);
    onChange(Number(name.charAt(0))); // Pass number of adults
  };

  return (
    <Menu as='div' className='w-full h-full bg-white relative'>
      <Menu.Button className='w-full h-full flex items-center justify-between px-8'>
        {adults}
        <BsChevronDown className='text-base text-accent-hover' />
      </Menu.Button>
      <Menu.Items as='ul' className='bg-white absolute w-full flex flex-col z-40'>
        {list.map((li, index) => (
          <Menu.Item
            onClick={() => handleChange(li.name)}
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

export default AdultsDropdown;


// import React, { useState } from 'react';
// import { Menu } from '@headlessui/react';
// import { BsChevronDown } from 'react-icons/bs';

// const list = [
//   { name: '1 Adult'},
//   { name: '2 Adults'},
//   { name: '3 Adults'},
//   { name: '4 Adults'},
// ];

// const AdultsDropdown = () => {
//   const [adults, setAdults] = useState('1 Adult'); // Default value

//   return (
//     <Menu as='div' className='w-full h-full bg-white relative'> 
//       <Menu.Button className='w-full h-full flex items-center justify-between px-8'>
//         {adults}
//         <BsChevronDown className='text-base text-accent-hover' />
//       </Menu.Button>
//       <Menu.Items as='ul' className='bg-white absolute w-full flex flex-col z-40'>
//         {list.map((li, index) => {
//           return (
//             <Menu.Item 
//               onClick={() => setAdults(li.name)}
//               as='li' 
//               className='border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex justify-center items-center cursor-pointer' 
//               key={index}>
//               {li.name}
//             </Menu.Item>
//           );
//         })}
//       </Menu.Items>
//     </Menu>
//   );
// };

// export default AdultsDropdown;

