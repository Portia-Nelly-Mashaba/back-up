import React, { useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { useDispatch } from 'react-redux';
import { SAVE_BILLING_ADDRESS } from '../../redux/slice/checkoutSlice'
import { useNavigate } from 'react-router-dom';


const initialAddressState ={
  email: '',
  full_name: '',
  id_no: '',
  phone_no: '',
  address: '',
  country: '',
  code:''
}

const CheckOutDetails = () => {
  const [billingAddress, setBillingAddress] = useState({...initialAddressState});

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleBilling = (e) => {
    const {name, value} = e.target
    setBillingAddress({
      ...billingAddress,
      [name]: value
    })
  };

  
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(billingAddress);
    dispatch(SAVE_BILLING_ADDRESS(billingAddress))
    navigate('/payment')
  };

  return (
    <div>
      
      {/* Main Content */}
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Checkout Summary</p>
          <p className="text-gray-400">Check your details. And select a suitable payment method.</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {/* Item 1 */}
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">Nike Air Max Pro 8888 - Super Light</span>
                <span className="float-right text-gray-400">42EU - 8.5US</span>
                <p className="text-lg font-bold">$138.99</p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <p className="mt-8 text-lg font-medium">Payment Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input className="peer hidden" id="radio_1" type="radio" name="radio" defaultChecked />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">e-Wallet</span>
                  <p className="text-slate-500 text-sm leading-6">Reflect: 2-4 Days</p>
                </div>
              </label>
            </div>

            <div className="relative">
              <input className="peer hidden" id="radio_2" type="radio" name="radio" defaultChecked />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">PayStripe</span>
                  <p className="text-slate-500 text-sm leading-6">Reflect: immediately</p>
                </div>
              </label>
            </div>
          </form>
        </div>

        {/* Payment Details */}
        <form onSubmit={handleSubmit}>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Checkout Details</p>
          <p className="text-gray-400">Complete your booking by providing your personal details.</p>
          <div className="">
            <label className="mt-4 mb-2 block text-sm font-medium">Email</label>
            <div className="relative">
              <input 
              type="text"  
              name="email" 
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" 
              placeholder="your.email@gmail.com"
              value={billingAddress.email}
              onChange={(e) => handleBilling(e)} 
              required />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>

            <label className="mt-4 mb-2 block text-sm font-medium">Full Name</label>
            <div className="relative">
              <input 
              type="text" 
              name="full_name" 
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" 
              placeholder="Your full name here"
              value={billingAddress.full_name}
              onChange={(e) => handleBilling(e)} 
              required />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                </svg>
              </div>
            </div>

            <label className="mt-4 mb-2 block text-sm font-medium">Identity Number</label>
            <div className="relative">
              <input 
              type="text"  
              name="id_no" 
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" 
              placeholder="210213-0457-044"
              value={billingAddress.id_no}
              onChange={(e) => handleBilling(e)} 
              required />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                  </svg>
                </div>
              </div>

            <label className="mt-4 mb-2 block text-sm font-medium">Phone Number</label>
            <div className="relative">
                <input 
                type="text" 
                name="phone_no" 
                className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" 
                placeholder="210421-0897-044"
                value={billingAddress.phone_no}
              onChange={(e) => handleBilling(e)} 
              required />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                  </svg>
                </div>
            </div>

            <label className="mt-4 mb-2 block text-sm font-medium">Home Address</label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input 
                type="text" 
                name="address" 
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" 
                placeholder="Street Address"
                value={billingAddress.address}
              onChange={(e) => handleBilling(e)} 
              required />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3 mr-4">
                  <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt="" />
                </div>
              </div>
             
                <CountryDropdown 
                valueType='short'
                value='billingAddress.country'
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                onChange={(val) => handleBilling({
                  target: 
                  {
                    name: 'country',
                    value: val
                  }
                })} 
              />
                {/* <option disabled>Country</option>
                            {country.map((type) => {
                              return (
                                <option key={type.id} value={type.name}>{type.name}</option>
                              )
                            })} */}
             
              <input 
              type="number" 
              name="code" 
              className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" 
              placeholder="Code"
              value={billingAddress.code}
              onChange={(e) => handleBilling(e)} 
              required />
            </div>

            {/* Total */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total Amount</p>
              <p className="text-2xl font-semibold text-gray-900">$408.00</p>
              </div>
              <div className="flex items-center justify-between">
                
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              
            </div>
          </div>
          <button type='submit' className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Proceed To Checkout</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOutDetails;
