import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import checkoutReducer from "./slice/checkoutSlice";
import bookingReducer from "./slice/bookingSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    checkout: checkoutReducer,
    bookings: bookingReducer,

});
const store = configureStore({
    reducer: rootReducer, 
})

export default store;