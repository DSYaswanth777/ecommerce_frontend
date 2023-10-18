// orderSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an async thunk to place an order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await fetch("http://localhost:3000/api/v1/place/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
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
  async ({orderID, paymentStatus}, { getState, rejectWithValue }) => {
  console.log(orderID)
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
            paymentStatus
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

// Create an order slice
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders=action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePaymentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orders=action.payload;
        
        // Update the payment status of the order in the state
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
