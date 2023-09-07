import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an asynchronous thunk action for logging in
export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (credentials) => {
    try {
      // Make your API call here using fetch or axios
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        // Handle errors here (e.g., invalid credentials)
        throw new Error("Login failed");
      }

      const data = await response.json();

      // Assuming your API response structure includes user data and a token
      const { user, token, message } = data;

      // Determine if the user is an admin based on their role
      const isAdmin = user && user.role === "admin";

      // Return the user, token, isAdmin, and message to be used as the payload
      return { user, token, isAdmin, message };
    } catch (error) {
      // Handle any network or API errors here
      throw error;
    }
  }
);

const loadUserFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Load isAdmin state from local storage

  if (token && isAuthenticated) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return { user, isAdmin };
    } catch (error) {
      console.error("Error parsing user data from local storage:", error);
    }
  }

  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: loadUserFromLocalStorage()?.user,
    token: localStorage.getItem("token"),
    isAuthenticated: loadUserFromLocalStorage() !== null,
    isAdmin: loadUserFromLocalStorage()?.isAdmin || false, // Load isAdmin state from local storage or default to false
    isLoading: false,
    loginMessage: "",
  },
  reducers: {
    // Your existing reducers here
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false; // Reset isAdmin to false on logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.setItem("isAuthenticated", "false");
      localStorage.setItem("isAdmin", "false"); // Reset isAdmin in local storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.isAdmin; // Update isAdmin based on the response
        state.isLoading = false;
        state.loginMessage = action.payload.message;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("isAdmin", action.payload.isAdmin ? "true" : "false"); // Store isAdmin in local storage
        // toast.success(state.loginMessage);
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
