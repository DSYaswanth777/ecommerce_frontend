
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Define an asynchronous thunk action to fetch categories
export const fetchCategoriesAsync = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      return data.categories; // Assuming your API response contains an array of categories
    } catch (error) {
      throw error;
    }
  }
);
export const deleteCategoryAsync = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { getState }) => {
    try {
      const token = getState().auth.token; // Assuming you have a token in your auth state
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/delete/categories/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
      // If the category is successfully deleted, you can return a success message or status
      return "Category deleted successfully";
    } catch (error) {
      throw error;
    }
  }
);
// Create a slice for categories
const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
