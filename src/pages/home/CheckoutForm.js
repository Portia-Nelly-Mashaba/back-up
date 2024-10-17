import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectEmail, selectUserName } from "../../redux/slice/authSlice";
import { selectBillingAddress } from "../../redux/slice/checkoutSlice";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation(); 

  const stripe = useStripe();
  const elements = useElements();

  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectEmail);
  const userAddress = useSelector(selectBillingAddress);
  const navigate = useNavigate();

  // Define paymentElementOptions if you have specific options, otherwise leave it as an empty object
  const paymentElementOptions = {
    layout: "tabs", // Example option, you can customize as needed
  };
  const {
    numberOfNights,
    totalAmount,
    checkInDate,
    checkOutDate,
    adults,
    kids,
    roomType: room_type,  
    roomNo: room_no,  
  } = state;
  console.log("State data:", state);

  // Function to save the booking to Firestore
  const saveBooking = async () => {
    const today = new Date();
    const bookingData = {
      userEmail,
      userName,
      userAddress,
      totalAmount,
      numberOfNights,
      checkInDate,
      checkOutDate,
      adults,
      kids,
      roomNo: room_no,  
      roomType: room_type,  
      bookingDate: today.toDateString(), 
      bookingTime: today.toLocaleTimeString(), 
      bookingStatus: "Room Booked",
      createdAt: Timestamp.now(), 
    };

    try {
      // Save the booking to Firestore
      await addDoc(collection(db, "bookings"), bookingData);
      toast.success("Booking saved successfully!"); // Show success toast
    } catch (error) {
      toast.error("Failed to save booking: " + error.message); // Show error toast
    }
  };

  // Handle Stripe payment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // Confirm payment with Stripe
    const result = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          
          return_url: "http://localhost:4243/contact",
        },
        redirect: "if_required", 
      });

    if (result.error) {
      // Handle error in payment process
      toast.error(result.error.message);
      setMessage(result.error.message);
    } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      // Payment succeeded, save booking to Firestore
      toast.success("Payment successful");
      await saveBooking(); 
      navigate("/payment-success");
    }

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
