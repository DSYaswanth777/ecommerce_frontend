import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { user, token, message } = response.data;
        toast.success(message); // Display a success toast
        return { user, token, message };
      } else if (response.status === 404) {
        toast.error("User not found"); // Display an error toast
      } else if (response.status === 400) {
        toast.error("Invalid credentials"); // Display an error toast
      } else if (response.status === 500) {
        toast.error("Server error"); // Display an error toast
      }

      throw new Error("Login failed");
    } catch (error) {
      toast.error("Login failed"); // Display an error toast
      throw error;
    }
  }
);

export const signupAsync = createAsyncThunk(
  "auth/signupAsync",
  async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/signup",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Signup successful"); // Display a success toast
      } else if (response.status === 400) {
        toast.error("Bad request"); // Display an error toast
      } else if (response.status === 500) {
        toast.error("Server error"); // Display an error toast
      }

      if (response.status === 200) {
        const { otp } = response.data;
        return { otp };
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      toast.error("Signup failed"); // Display an error toast
      throw error;
    }
  }
);

export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPasswordAsync",
  async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/forgot-password",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("OTP sent successfully"); // Display a success toast
      } else if (response.status === 400) {
        toast.error("Bad request"); // Display an error toast
      } else if (response.status === 500) {
        toast.error("Server error"); // Display an error toast
      }

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to Send OTP");
      }
    } catch (error) {
      toast.error("Failed to Send OTP"); // Display an error toast
      throw error;
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPasswordAsync",
  async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/reset-password",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successful"); // Display a success toast
      } else if (response.status === 400) {
        toast.error("Bad request"); // Display an error toast
      } else if (response.status === 500) {
        toast.error("Server error"); // Display an error toast
      }

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to Reset Password");
      }
    } catch (error) {
      toast.error("Failed to Reset Password"); // Display an error toast
      throw error;
    }
  }
);

export const verifyOtpAsync = createAsyncThunk(
  "auth/verifyOtpAsync",
  async ({ mobile, otp }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/verify-otp",
        { mobile, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("OTP verification successful"); // Display a success toast
      } else if (response.status === 400) {
        toast.error("Bad request"); // Display an error toast
      } else if (response.status === 500) {
        toast.error("Server error"); // Display an error toast
      }

      if (response.status !== 200) {
        throw new Error("OTP verification failed");
      }

      return null;
    } catch (error) {
      toast.error("OTP verification failed"); // Display an error toast
      throw error;
    }
  }
);

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
    isUserNotVerified: false,
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
