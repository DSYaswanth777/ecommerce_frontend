// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page) => {
    // const response = await fetch("http://localhost:3000/api/v1/products");
    const response = await fetch(`http://localhost:3000/api/v1/products`);

    const data = await response.json();
    return data;
  }
);
export const addProductAsync = createAsyncThunk(
  "products/addProduct",
  async (formData, { getState }) => {
    try {
      const token = getState().auth.token;
      const config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      const response = await fetch(
        "http://localhost:3000/api/v1/admin/add/product",
        config
      );

      if (!response.ok) {
        throw new Error("Failed to add the product");
      }
      // If the product is successfully added, you can return a success message or status
      return "Product added successfully";
    } catch (error) {
      throw error;
    }
  }
);
export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { getState }) => {
    try {
      const token = getState().auth.token; // Assuming you have a token in your auth state
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/products/delete/${productId}`,
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
export const editProductAsync = createAsyncThunk(
  "products/editProduct",
  async (editProductData, { getState }) => {
    const { id, ...requestData } = editProductData;
    try {
      const token = getState().auth.token;
      const config = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      };
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/products/edit/${editProductData.id}`,
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
export const searchProductsAsync = createAsyncThunk(
  "products/searchProducts",
  async (productName) => {
    try {
      // You can pass the productName as a query parameter to your API endpoint
      const response = await fetch(
        `http://localhost:3000/api/v1/products/search?productName=${productName}`
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
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(editProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProductsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(searchProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

  },
});

export default productSlice.reducer;
