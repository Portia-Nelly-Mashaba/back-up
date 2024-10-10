import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const  CheckoutForm = (dpmCheckerLink) =>{
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/complete",
      },
    });


    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <>
   <section className="bg-white dark:bg-gray-900 w-screen h-screen py-8 antialiased md:py-16">
      <div className="flex justify-center items-center h-full"> 
        <div className="mx-auto w-full max-w-6xl flex flex-col lg:flex-row justify-center items-start gap-8"> 
          
          {/* Payment Form */}
          <div className="w-full lg:w-1/2 bg-white shadow-lg p-5 text-gray-700 rounded-lg"> 
            <div className="w-full pt-1 pb-5">
              <div className="bg-accent text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8h18M7 16h.01M11 16h2m-7 4h10a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="mb-10">
              <h1 className="text-center font-bold text-xl uppercase">Secure payment info</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
                
                <div>
                  <input
                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="John Smith"
                    type="text"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="font-bold text-sm mb-2 ml-1">Card number</label>
                <div>
                  <input
                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="0000 0000 0000 0000"
                    type="text"
                  />
                </div>
              </div>

              <div className="mb-3 -mx-2 flex items-end">
                <div className="px-2 w-1/2">
                  <label className="font-bold text-sm mb-2 ml-1">Expiration date</label>
                  <div>
                    <select
                      className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                    >
                      <option value="01">01 - January</option>
                      <option value="02">02 - February</option>
                      <option value="03">03 - March</option>
                      <option value="04">04 - April</option>
                      <option value="05">05 - May</option>
                      <option value="06">06 - June</option>
                      <option value="07">07 - July</option>
                      <option value="08">08 - August</option>
                      <option value="09">09 - September</option>
                      <option value="10">10 - October</option>
                      <option value="11">11 - November</option>
                      <option value="12">12 - December</option>
                    </select>
                  </div>
                </div>
                <div className="px-2 w-1/2">
                  <select
                    className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                  >
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
              </div>

              <div className="mb-10">
                <label className="font-bold text-sm mb-2 ml-1">Security code</label>
                <div>
                  <input
                    className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="000"
                    type="text"
                  />
                </div>
              </div>

              <div>
                <button className="block w-full max-w-xs mx-auto bg-accent hover:bg-accent focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                  PAY NOW
                </button>
              </div>
            </form>
          </div>
          
          {/* Price Summary Component on the right */}
          <div className="w-full lg:w-1/2">
          <div className="mt-6 grow sm:mt-8 lg:mt-0">
      <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
        <p className="text-base font-medium text-gray-900 dark:text-white">Checkout Summary</p>
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Room Rate </dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">$150/night</dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Nights</dt>
            <dd className="text-base font-medium text-green-500">3</dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Discount</dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">R 0</dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">$799</dd>
          </dl>
        </div>

        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
          <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
          <dd className="text-base font-bold text-gray-900 dark:text-white">$7,191.00</dd>
        </dl>
      </div>
    </div>
          </div>
          
        </div>
        </div>
      
    </section>
    </>
  );
}

export default CheckoutForm;







