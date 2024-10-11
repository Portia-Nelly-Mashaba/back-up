import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

    // Define paymentElementOptions if you have specific options, otherwise leave it as an empty object
    const paymentElementOptions = {
        layout: "tabs" // Example option, you can customize as needed
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:4243/payment-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        // ok - paymentIntent // bad - error
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment successful");
            // saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <section className="bg-white dark:bg-gray-900 w-screen h-screen py-8 antialiased md:py-16">
      <div className="flex justify-center items-center h-full">
        <div className="mx-auto w-full max-w-6xl flex flex-col lg:flex-row justify-center items-start gap-8">
          
          {/* Payment Form */}
          <div className="w-full lg:w-1/2 bg-white shadow-lg p-5 text-gray-700 rounded-lg">
            <div className="mb-10">
              <h1 className="text-center font-bold text-xl uppercase">Secure payment info</h1>
            </div>
            
            <form onSubmit={handleSubmit}>
              <PaymentElement id="payment-element" options={paymentElementOptions} />

             
              {message && <div id="payment-message" className="text-red-500 mt-4">{message}</div>}

              <div className="mt-6">
                <button
                  disabled={isLoading || !stripe || !elements}
                  className="block w-full max-w-xs mx-auto bg-accent hover:bg-accent focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                >
                  {isLoading ? "Processing..." : "PAY NOW"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
