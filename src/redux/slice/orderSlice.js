// orderSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an async thunk to place an order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (
    { fullName, landmark, mobileNumber, pincode, streetAddress, townCity },
    { getState, rejectWithValue }
  ) => {
    const shippingAddress = {
      fullName,
      landmark,
      mobileNumber,
      pincode,
      streetAddress,
      townCity,
    };
    console.log(shippingAddress)
    try {
      const token = getState().auth.token;

      const response = await fetch("http://localhost:3000/api/v1/place/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({shippingAddress}),
      });
      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define an async thunk to update the payment status of an order
export const updatePaymentStatus = createAsyncThunk(
  "orders/updatePaymentStatus",
  async ({ orderID, paymentStatus }, { getState, rejectWithValue }) => {
    console.log(orderID);
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/verify/payment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderID,
            paymentStatus,
          }),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchuserorders",
  async (_,{getState }) => {
    try {
      const token = getState().auth.token;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        "http://localhost:3000/api/v1/user/orders",
        config
      );
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  }
);
// Create an order slice
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updatePaymentStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export default orderSlice.reducer;
