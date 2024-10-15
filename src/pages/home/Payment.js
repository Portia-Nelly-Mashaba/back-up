import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectEmail } from "../../redux/slice/authSlice";
import { selectBillingAddress } from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const [message, setMessage] = useState("Initializing checkout");
  const [clientSecret, setClientSecret] = useState("");

  const location = useLocation();
  const customerEmail = useSelector(selectEmail);
  const billingAddress = useSelector(selectBillingAddress);
  console.log(customerEmail);
  console.log(billingAddress);
  

  const {
    totalAmount = 0,
    numberOfNights = 0,
    checkInDate = "",
    checkOutDate = "",
    adults = 1,
    kids = 0,
  } = location.state || {};

  const amountPerNight = totalAmount / numberOfNights || 0; 

  useEffect(() => {
    console.log("Values before payment intent creation:", {
      numberOfNights,
      amountPerNight,
      customerEmail,
    });

    // if (!numberOfNights || !billingAddress || !totalAmount) {
    //   setMessage("Invalid total amount, nights, or billing address.");
    //   return;
    // }

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
        roomCapacity: 2, // Adjust this based on your room capacity logic
        userEmail: customerEmail,
        billingAddress,
        description: `Mzansi Stays hotel payment: email: ${customerEmail}, Amount: ${totalAmount}`,
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
  }, [numberOfNights, totalAmount, billingAddress]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <section>
      <div className="container">
        {!clientSecret ? (
          <h3>{message}</h3>
        ) : (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </section>
  );
};

export default Payment;

