// orderSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an async thunk to place an order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (
    {
      fullName,
      landmark,
      mobileNumber,
      pincode,
      streetAddress,
      townCity,
      state,
    },
    { getState, rejectWithValue }
  ) => {
    const shippingAddress = {
      fullName,
      landmark,
      mobileNumber,
      pincode,
      streetAddress,
      townCity,
      state,
    };
    try {
      const token = getState().auth.token;

      const response = await fetch("http://localhost:3000/api/v1/place/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ shippingAddress }),
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
  async (_, { getState }) => {
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
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchAdminOrders = createAsyncThunk(
  "orders/fetchAdminorders",
  async (_, { getState }) => {
    try {
      const token = getState().auth.token;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        "http://localhost:3000/api/v1/admin/orders",
        config
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const downloadPDF = createAsyncThunk(
  "orders/downloadPDF",
  async (orderID, { getState }) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/generate/shipping/address/${orderID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Convert the response to a blob
        const blob = await response.blob();

        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element to trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = `order-${orderID}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        return { success: true };
      } else {
        // Handle the case where the PDF generation failed
        console.error("Failed to generate and download the PDF");
        return {
          success: false,
          error: "Failed to generate and download the PDF",
        };
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      return { success: false, error: error.message };
    }
  }
);
export const fetchOrdersByOrderID = createAsyncThunk(
  "orders/fetchOrdersByDate",
  async (orderID, { getState }) => {
    console.log(orderID);
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/orders/filter/order?orderID=${orderID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to order!");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchorderByDate = createAsyncThunk(
  "orders/fetchOrdersByDate",
  async (orderDate) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/filter?orderDate=${orderDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to order!");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const viewOrderAsync = createAsyncThunk(
  "orders/vieworder",
  async (orderID,{getState}) => {
    const token = getState().auth.token;

    try {
      // You can pass the productName as a query parameter to your API endpoint
      const response = await fetch(
        `http://localhost:3000/api/v1/user/orders/orderdetail/${orderID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to search products");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);
//** Create an order slice
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: null,
    status: "idle",
    order:null
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
      .addCase(fetchAdminOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(viewOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(viewOrderAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(viewOrderAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // .addCase(fetchorderByDate.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchorderByDate.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.orders = action.payload;
      // })
      // .addCase(fetchorderByDate.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.payload;
      // })
      .addCase(fetchOrdersByOrderID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersByOrderID.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByOrderID.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
