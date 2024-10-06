import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import checkoutReducer from "./slice/checkoutSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    checkout: checkoutReducer,
});
const store = configureStore({
    reducer: rootReducer, 
})

export default store;