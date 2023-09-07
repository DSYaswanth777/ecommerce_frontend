// store.js
import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from '../slice/authSlice';
// import { composeWithDevTools } from 'redux-devtools-extension';
const store = configureStore({
  reducer: {
    auth: authReducer,
    // Other reducers...
  },
//   enhancers: [composeWithDevTools()]
});

export default store;
