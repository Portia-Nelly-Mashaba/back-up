import React, { useState } from 'react'

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        {/* Contact Form Two */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Contact Form 2</h3>
          </div>
          <form>
            <div className="p-6.5">
              {/* Name Fields */}
              <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">First name</label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Last name</label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              {/* Email & Phone Fields */}
              <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Email</label>
                  <input
                    type="email"
                    placeholder="yourmail@gmail.com"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">Phone</label>
                  <input
                    type="text"
                    placeholder="(321) 5555-0115"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              {/* Select Option */}
              <div className="mb-5.5">
                <label className="mb-4.5 block text-sm font-medium text-black dark:text-white">Select option</label>
                <div className="flex flex-wrap items-center gap-5.5">
                  {['Graphics', 'Web', 'Logo', 'Others'].map(option => (
                    <div key={option}>
                      <label className="relative flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-black dark:text-white">
                        <input
                          type="radio"
                          className="sr-only"
                          name="roleSelect"
                          value={option}
                          onChange={() => setSelectedOption(option)}
                        />
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${selectedOption === option ? 'border-primary' : 'border-body'}`}>
                          <span className={`h-2.5 w-2.5 rounded-full bg-primary ${selectedOption === option ? 'flex' : 'hidden'}`}></span>
                        </span>
                        {option === 'Graphics' && 'Graphics Design'}
                        {option === 'Web' && 'Web Development'}
                        {option === 'Logo' && 'Logo Design'}
                        {option === 'Others' && 'Others'}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Message</label>
                <textarea
                  rows="6"
                  placeholder="Type your message"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard
