import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsercartAsync = createAsyncThunk(
  "cart/fetchUserCartAsync",
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
        "http://localhost:3000/api/v1/user/cart",
        config
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const cartAddAsync = createAsyncThunk(
  "cart/cartAddAsync",
  async (productId, { getState }) => {
    const token = getState().auth.token;
    try {
      // Create an object with the productId key
      const requestData = {
        productId: productId,
      };

      // Make the API call using fetch or axios
      const response = await fetch(
        `http://localhost:3000/api/v1/user/cart/add`,
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
        throw new Error("Error While Adding product to cart");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);
export const cartQuantityIncreaseAsync = createAsyncThunk(
    "cart/cartQuantityIncreaseAsync",
    async (cartItemId, { getState }) => {
      const token = getState().auth.token;
      try {
        // Create an object with the productId key
        const requestData = {
          cartItemId: cartItemId,
        };
  
        // Make the API call using fetch or axios
        const response = await fetch(
          `http://localhost:3000/api/v1/user/cart/increase`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestData), // Send the requestData object as JSON
          }
        );
  
        if (!response.ok) {
          throw new Error("Error While Adding product to cart");
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    }
  );
export const cartQuantityDecreaseAsync = createAsyncThunk(
    "cart/cartQuantityDecreaseAsync",
    async (cartItemId, { getState }) => {
      const token = getState().auth.token;
      try {
        // Create an object with the productId key
        const requestData = {
          cartItemId: cartItemId,
        };
  
        // Make the API call using fetch or axios
        const response = await fetch(
          `http://localhost:3000/api/v1/user/cart/decrease`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestData), // Send the requestData object as JSON
          }
        );
  
        if (!response.ok) {
          throw new Error("Error While Adding product to cart");
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    }
  );
export const deletecartAsync = createAsyncThunk(
  "cart/deletecartAsync",
  async ( cartItemId , { getState }) => {
    const token = getState().auth.token;
    try {
      const requestData = {
        cartItemId: cartItemId,
      };
      // Make your API call here using fetch or axios
      const response = await fetch(
        `http://localhost:3000/api/v1/user/cart/remove`,
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
        throw new Error("Error While deleting cart");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle any network or API errors here
      throw error;
    }
  }
);
//**  Create a slice for cart*/
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsercartAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsercartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(fetchUsercartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
