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
  const { totalAmount, numberOfNights, checkInDate, checkOutDate, adults, kids } = location.state || {};

  const billingAddress = useSelector(selectBillingAddress);
  const customerEmail = useSelector(selectEmail);

  const dispatch = useDispatch();

  // Ensure the required values exist before dispatching or making fetch requests
  useEffect(() => {
    if (!totalAmount) {
      setMessage('Invalid total amount.');
    }
  }, [totalAmount]);

  const description = `Mzansi Stays payment: email: ${customerEmail}, Amount: ${totalAmount}`;

  useEffect(() => {
    if (numberOfNights && checkInDate && checkOutDate && adults && customerEmail && billingAddress) {
      fetch("http://localhost:4242/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: numberOfNights,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          adults,
          kids,
          userEmail: customerEmail,
          address: billingAddress,
          description
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
        toast.error("Something went wrong");
      });
    } else {
      setMessage("Missing required booking information.");
    }
  }, [numberOfNights, checkInDate, checkOutDate, adults, kids, customerEmail, billingAddress, description]);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
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
    </>
  );
};

export default Payment;
