import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
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
        "http://localhost:3000/api/v1/admin/customers",
        config
      );
      const data = await response.json();
      return data.customers;
    } catch (error) {
      throw error;
    }
  }
);
const customerSlice = createSlice({
    name: "customers",
    initialState: {
      customers: null,
      status: "idle",
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCustomers.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchCustomers.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.customers = action.payload;
        })
        .addCase(fetchCustomers.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
    },
  });
  
  export default customerSlice.reducer;