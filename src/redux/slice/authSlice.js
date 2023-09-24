import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an asynchronous thunk action for logging in
export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (credentials) => {
    try {
      // Make your API call here using fetch or axios
      const response = await fetch("https://animated-rhythm-399204.el.r.appspot.com/api/v1/login", {
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
export const signupAsync = createAsyncThunk(
  "auth/signupAsync",
  async (userData) => {
    try {
      // Make your API call here using fetch or axios
      const response = await fetch("http://localhost:3000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        // Handle errors here (e.g., duplicate email)
        throw new Error("Signup failed");
      }
      // You may receive an OTP in the response, depending on your API design
      const data = await response.json();
      // Assuming your API response structure includes an OTP field
      const { otp } = data;
      return { otp };
    } catch (error) {
      // Handle any network or API errors here
      throw error;
    }
  }
);
export const forgotPasswordAsync = createAsyncThunk(
  "auth/signupAsync",
  async (userData) => {
    try {
      // Make your API call here using fetch or axios
      const response = await fetch("http://localhost:3000/api/v1/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to Send OTP");
      }
      // You may receive an OTP in the response, depending on your API design
      const data = await response.json();
      return data
    } catch (error) {
      throw error;
    }
  }
)
export const resetPasswordAsync = createAsyncThunk(
  "auth/signupAsync",
  async (userData) => {
    try {
      // Make your API call here using fetch or axios
      const response = await fetch("http://localhost:3000/api/v1/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to Send OTP");
      }
      // You may receive an OTP in the response, depending on your API design
      const data = await response.json();
      return data
    } catch (error) {
      throw error;
    }
  }
)
export const verifyOtpAsync = createAsyncThunk(
  "auth/verifyOtpAsync",
  async ({ mobile, otp }) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, otp }),
      });

      if (!response.ok) {
        throw new Error("OTP verification failed");
      }

      // OTP verification succeeded, no need to return any data
      return null;
    } catch (error) {
      // Handle OTP verification error
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
    isUserNotVerified: false
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
