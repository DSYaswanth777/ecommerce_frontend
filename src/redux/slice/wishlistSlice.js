import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserWishlistAsync = createAsyncThunk(
  "wishlist/fetchUserWishlistAsync",
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
        "http://localhost:3000/api/v1/wishlist",
        config
      );
      const data = await response.json();
      return data.wishlistItems;
    } catch (error) {
      throw error;
    }
  }
);
export const wishlistAddAsync = createAsyncThunk(
  "wishlist/wishlistAddAsync",
  async (productId, { getState }) => {
    const token = getState().auth.token;
    try {
      // Create an object with the productId key
      const requestData = {
        productId: productId,
      };

      // Make the API call using fetch or axios
      const response = await fetch(
        `http://localhost:3000/api/v1/wishlist/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData), // Send the requestData object as JSON
        }
      );

      if (!response.ok) {
        throw new Error("Error While Adding product to wishlist");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteWishlistAsync = createAsyncThunk(
  "wishlist/deleteWishlistAsync",
  async ( wishlistItemId , { getState }) => {
    const token = getState().auth.token;
    try {
      const requestData = {
        wishlistItemId: wishlistItemId,
      };
      // Make your API call here using fetch or axios
      const response = await fetch(
        `http://localhost:3000/api/v1/wishlist/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
          },
          body: JSON.stringify(requestData), // Send the requestData object as JSON

        }
      );
      if (!response.ok) {
        throw new Error("Error While deleting Wishlist");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle any network or API errors here
      throw error;
    }
  }
);
//**  Create a slice for wishlist*/
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserWishlistAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserWishlistAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wishlist = action.payload;
      })
      .addCase(fetchUserWishlistAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default wishlistSlice.reducer;
