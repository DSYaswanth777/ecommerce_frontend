import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCoupons = createAsyncThunk(
  "coupons/fetchcoupons",
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
        "http://localhost:3000/api/v1/admin/coupons",
        config
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const addCouponAsync = createAsyncThunk(
  "coupons/addCoupon",
  async (couponData, { getState }) => {
    try {
      const token = getState().auth.token; // Retrieve the token from the auth state

      const config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(couponData),
      };

      const response = await fetch(
        "http://localhost:3000/api/v1/admin/add/coupon",
        config
      );

      if (!response.ok) {
        throw new Error("Failed to add a coupon");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteCouponAsync = createAsyncThunk(
  "coupons/deleteCoupons",
  async (couponId, { getState }) => {
    try {
      const token = getState().auth.token; // Assuming you have a token in your auth state
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/delete/coupon/${couponId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the product");
      }
      // If the category is successfully deleted, you can return a success message or status
      return "Product deleted successfully";
    } catch (error) {
      throw error;
    }
  }
);
export const editCouponAsync = createAsyncThunk(
  "coupons/editProduct",
  async (couponId, editCouponData, { getState }) => {
    try {
      const token = getState().auth.token;
      const config = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editCouponData),
      };
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/coupon/edit/${couponId}`,
        config
      );

      if (!response.ok) {
        throw new Error("Failed to edit the product");
      }
      // If the product is successfully edited, you can return a success message or status
      return "Product edited successfully";
    } catch (error) {
      throw error;
    }
  }
);
export const searchCouponAsync = createAsyncThunk(
  "coupons/searchcoupons",
  async (couponName) => {
    try {
      // You can pass the productName as a query parameter to your API endpoint
      const response = await fetch(
        `http://localhost:3000/api/v1/coupons/search?productName=${couponName}`
      );

      if (!response.ok) {
        throw new Error("Failed to search coupons");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);
const couponSlice = createSlice({
  name: "coupons",
  initialState: {
    coupons: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCouponAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCouponAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // You can handle the success action here if needed
      })
      .addCase(addCouponAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editCouponAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editCouponAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // You can handle the success action here if needed
      })
      .addCase(editCouponAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchCouponAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchCouponAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coupons = action.payload;
      })
      .addCase(searchCouponAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default couponSlice.reducer;
