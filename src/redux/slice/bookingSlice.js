import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bookingHistory: [],
    totalBookingAmount: null,
}

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    STORE_BOOKINGS(state, action) {
        state.bookingHistory = action.payload
    },
    CALC_TOTAL_BOOKING_AMOUNT(state, action){
      const array = [];
      state.bookingHistory.map((item) => {
        const {bookingAmount} = item;
        return array.push(bookingAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b
      }, 0)
      state.totalBookingAmount = totalAmount
    }
  }
});

export const {STORE_BOOKINGS, CALC_TOTAL_BOOKING_AMOUNT} = bookingSlice.actions

export const selectBookingHistory = (state) => state.bookings.bookingHistory


export const selectTotalBookingAmount = (state) => state.bookings.totalBookingAmount

export default bookingSlice.reducer