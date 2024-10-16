import React, { useState, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { addDoc, collection, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify"; // Import toast for notifications
import { useLocation } from "react-router-dom"; // Import useLocation if not already
import { db } from "../../firebase/config";

export default function CheckoutForm() {
  const [message, setMessage] = useState("Initializing checkout");
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();

  const {
    totalAmount = 0,
    numberOfNights = 0,
    checkInDate = "",
    checkOutDate = "",
    adults = 1,
    kids = 0,
    amountPerNight,
    roomCapacity,
    userEmail,
    userName,
    userAddress,
    roomNo,
    roomType,
  } = location.state || {};

  useEffect(() => {
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nights: numberOfNights,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        adults,
        kids,
        amountPerNight,
        roomCapacity,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        console.error("Error initializing payment:", error);
        toast.error("Something went wrong");
      });
  }, [numberOfNights, checkInDate, checkOutDate, adults, kids, amountPerNight, roomCapacity]);

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
      roomNo,
      roomType,
      bookingDate: today.toDateString(),
      bookingTime: today.toLocaleTimeString(),
      bookingStatus: "Room Booked",
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "bookings"), bookingData);
      toast.success("Booking saved successfully!");
    } catch (error) {
      toast.error("Failed to save booking: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:4243/payment-success",
      },
      redirect: "if_required",
    });

    if (result.error) {
      toast.error(result.error.message);
      setMessage(result.error.message);
    } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      toast.success("Payment successful");
      await saveBooking();
    }

    setIsLoading(false);
  };

  return (
    <section className="bg-white dark:bg-gray-900 w-screen h-screen py-8 antialiased md:py-16">
      <div className="flex justify-center items-center h-full">
        <div className="mx-auto w-full max-w-6xl flex flex-col lg:flex-row justify-center items-start gap-8">
          <div className="w-full lg:w-1/2 bg-white shadow-lg p-5 text-gray-700 rounded-lg">
            <div className="mb-10">
              <h1 className="text-center font-bold text-xl uppercase">Secure payment info</h1>
            </div>

            <form onSubmit={handleSubmit}>
              <PaymentElement id="payment-element" />
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
}
