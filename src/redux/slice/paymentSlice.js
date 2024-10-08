import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalAmount: 0,
  numberOfNights: 0,
  baseRoomRate: 0,
  extraPersonFee: 0,
  serviceCharge: 30, // Fixed service charge
  taxAmount: 0,
  isValidReservation: true,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    CALCULATE_PAYMENT(state, action) {
      const {
        amount,
        people,
        checkInDate,
        checkOutDate,
        numberOfAdults,
        numberOfKids,
        taxRate = 0.10, // Default tax rate
      } = action.payload;

      // Function to calculate the number of nights
      const calculateNumberOfNights = (checkIn, checkOut) => {
        if (checkIn && checkOut) {
          const checkInDate = new Date(checkIn);
          const checkOutDate = new Date(checkOut);
          const timeDifference = checkOutDate - checkInDate;
          return Math.max(0, Math.ceil(timeDifference / (1000 * 3600 * 24))); // Days between dates
        }
        return 0;
      };

      // Calculate number of nights
      const numberOfNights = calculateNumberOfNights(checkInDate, checkOutDate);

      // Calculate base room rate
      const baseRoomRate = amount * numberOfNights;

      // Calculate extra person fee
      const extraPersonFee =
        numberOfAdults + numberOfKids > people
          ? (numberOfAdults + numberOfKids - people) * 20
          : 0;

      // Total before tax
      const totalBeforeTax = baseRoomRate + extraPersonFee + state.serviceCharge;

      // Calculate tax
      const taxAmount = totalBeforeTax * taxRate;

      // Calculate total amount
      const totalAmount = totalBeforeTax + taxAmount;

      // Validate reservation (total people must not exceed room capacity)
      const isValidReservation = numberOfAdults + numberOfKids <= people;

      // Update the state with calculated values
      state.numberOfNights = numberOfNights;
      state.baseRoomRate = baseRoomRate;
      state.extraPersonFee = extraPersonFee;
      state.taxAmount = taxAmount;
      state.totalAmount = totalAmount;
      state.isValidReservation = isValidReservation;
    },
  },
});

export const { CALCULATE_PAYMENT } = paymentSlice.actions;

export const selectTotalAmount = (state) => state.payment.totalAmount;
export const selectPaymentDetails = (state) => state.payment;

export default paymentSlice.reducer;

