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
export const categoryAddAsync = createAsyncThunk(
  "categories/categoryAddAsync",
  async (name, { getState }) => {
    const token = getState().auth.token;
    try {
      // Make your API call here using fetch or axios
      const response = await fetch(
        "http://localhost:3000/api/v1//admin/add/category",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
          },
          body: JSON.stringify(name),
        }
      );
      if (!response.ok) {
        throw new Error("Error While Adding Category");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle any network or API errors here
      throw error;
    }
  }
);
export const subCategoryAddAsync = createAsyncThunk(
  "categories/subCategoryAddAsync",
  async ({ body, categoryId }, { getState }) => {
    const token = getState().auth.token;
    try {
      // Make your API call here using fetch or axios
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/add/categories/${categoryId}/subcategory`,
        // http://localhost:3000/api/v1/admin/add/categories/6512532671101e41c59cec9e/subcategory
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
          },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Error While sub category Adding Category");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle any network or API errors here
      throw error;
    }
  }
);
export const deleteSubCategoryAsync = createAsyncThunk(
  "categories/deleteSubCategoryAsync",
  async ({ categoryId, subcategoryId }, { getState }) => {
    const token = getState().auth.token;
    try {
      // Make your API call here using fetch or axios
      const response = await fetch(
        `http://localhost:3000/api/v1/admin/delete/categories/${categoryId}/subcategories/${subcategoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error While sub category Deleting Category");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle any network or API errors here
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
export const searchCategoriesAsync = createAsyncThunk(
  "products/searchProducts",
  async (searchCategory) => {
    try {
      // You can pass the productName as a query parameter to your API endpoint
      const response = await fetch(
        `http://localhost:3000/api/v1/categories/search?searchCategory=${searchCategory}`
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
// Create a slice for categories
const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(searchCategoriesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
