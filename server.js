require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Mzasi Stays app.");
});

const calculateNumberOfNights = (checkIn, checkOut) => {
  if (checkIn && checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDifference = checkOutDate - checkInDate;
    return Math.max(0, Math.ceil(timeDifference / (1000 * 3600 * 24))); // Days between dates
  }
  return 0;
};

const calculateOrderAmount = ({ nights, checkIn, checkOut, adults, kids, amountPerNight, roomCapacity }) => {
  // Calculate the number of nights
  const numberOfNights = calculateNumberOfNights(checkIn, checkOut);

  // Base room rate (amount per night * number of nights)
  const baseRoomRate = amountPerNight * numberOfNights;

  // Calculate the extra person fee if the number of people exceeds the room capacity
  const totalPeople = adults + kids;
  const extraPersonFee = totalPeople > roomCapacity ? (totalPeople - roomCapacity) * 20 : 0;

  // Fixed service charge
  const serviceCharge = 30;

  // Total before tax
  const totalBeforeTax = baseRoomRate + extraPersonFee + serviceCharge;

  // Assuming a tax rate of 10%
  const taxRate = 0.10;
  const taxAmount = totalBeforeTax * taxRate;

  // Final total amount
  const totalAmount = totalBeforeTax + taxAmount;

  return Math.round(totalAmount * 100); // Stripe expects the amount in cents
};

app.post("/create-payment-intent", async (req, res) => {
  const { nights, checkIn, checkOut, adults, kids, amountPerNight, roomCapacity, address, description } = req.body;

  try {
    // Calculate order amount using the hotel pricing logic
    const orderAmount = calculateOrderAmount({
      nights,
      checkIn,
      checkOut,
      adults,
      kids,
      amountPerNight,
      roomCapacity
    });

    // Create a PaymentIntent with the calculated order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: orderAmount,
      currency: "zar",
      automatic_payment_methods: {
        enabled: true,
      },
      description,
      billing_address_collection: "required",
      shipping: {
        name: address.full_name,
        address: {
          line1: address.address,
          country: address.country,
          postal_code: address.code,
        },
        phone: address.phone_no,
        id: address.id_no,
      },

      
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});





// //Uncomment this part if you plan to use the payment intent
// const calculateOrderAmount = (items) => {
//   return 1400 * 100; // Replace this with your own logic to calculate the amount
// };

// app.post("/create-payment-intent", async (req, res) => {
//   const { items,  address, description } = req.body;

//   try {
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: calculateOrderAmount(items),
//       currency: "usd",
//       automatic_payment_methods: {
//         enabled: true,
//       },
//       description,
//       address:{
//         billingAddress: {
//           address: address.address,
//           country: address.country,
//           code: address.code
//         },
          
//         full_name: address.full_name,
//           id_no: address.id_no,
//           phone_no: address.phone_no,
//       },
     


//     });

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
