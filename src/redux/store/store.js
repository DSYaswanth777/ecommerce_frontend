// store.js
import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from '../slice/authSlice';
import categoriesReducer from '../slice/categoriesSlice';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"; 
import productSlice from '../slice/productSlice';
import couponSlice from '../slice/couponSlice';
import customerSlice from '../slice/customerSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    products:productSlice,
    coupons:couponSlice,
    customers:customerSlice
  },
  middleware: [thunk],
});

export default store;
