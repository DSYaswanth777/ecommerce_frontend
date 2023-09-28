// store.js
import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from '../slice/authSlice';
import categoriesReducer from '../slice/categoriesSlice';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"; 
import productSlice from '../slice/productSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    products:productSlice
  },
  middleware: [thunk],
//   enhancers: [composeWithDevTools()]
});

export default store;
