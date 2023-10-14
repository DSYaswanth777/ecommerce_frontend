import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAsync = createAsyncThunk("auth/loginAsync", async (credentials) => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/login", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Login failed");
    }

    const { user, token, message } = response.data;
    return { user, token, message };
  } catch (error) {
    throw error;
  }
});

export const signupAsync = createAsyncThunk("auth/signupAsync", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/signup", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Signup failed");
    }

    const { otp } = response.data;
    return { otp };
  } catch (error) {
    throw error;
  }
});

export const forgotPasswordAsync = createAsyncThunk("auth/forgotPasswordAsync", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/forgot-password", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to Send OTP");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const resetPasswordAsync = createAsyncThunk("auth/resetPasswordAsync", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/reset-password", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw Error("Failed to Reset Password");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const verifyOtpAsync = createAsyncThunk("auth/verifyOtpAsync", async ({ mobile, otp }) => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/verify-otp", { mobile, otp }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("OTP verification failed");
    }

    return null;
  } catch (error) {
    throw error;
  }
});

// Rest of your Redux code...

const loadUserFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (token && isAuthenticated) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return { user };
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.setItem("isAuthenticated", "false");
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
        state.isLoading = false;
        state.loginMessage = action.payload.message;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("isAuthenticated", "true");
  
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
