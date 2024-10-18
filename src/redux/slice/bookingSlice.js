import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bookingHistory: []
}

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    STORE_BOOKINGS(state, action) {
        state.bookingHistory = action.payload
    }
  }
});

export const {STORE_BOOKINGS} = bookingSlice.actions

export const selectBookingHistory = (state) => state.bookings.bookingHistory

export default bookingSlice.reducer