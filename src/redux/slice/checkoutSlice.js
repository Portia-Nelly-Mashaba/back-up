import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    billingAddress: {},
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    SAVE_BILLING_ADDRESS(state, action){
      console.log(action.payload);
      
        state.billingAddress = action.payload
    },
  }
});

export const {SAVE_BILLING_ADDRESS} = checkoutSlice.actions

export const selectBillingAddress = (state) => state.checkout.billingAddress;

export default checkoutSlice.reducer