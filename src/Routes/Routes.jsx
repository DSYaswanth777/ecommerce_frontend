import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../components/Login/Login";
import Home from "../pages/HomePage";
import Signup from "../components/SignUp/Signup";
import Products from "../components/Products/Products";
import Profile from "../components/Profile/Profile";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import CheckOutCart from "../components/CheckoutCart/CheckOutCart";
import Search from "../components/Search/Search";
import Orders from "../components/Orders/Orders";
import Wishlist from "../components/Wishlist/Wishlist";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import ViewProduct from "../components/Products/ViewProduct";
import ViewOrder from "../components/Orders/ViewOrder";

const PublicRoutes = () => {
  const user = useSelector((state) => state.auth);
  const userRole = useSelector((state) => state.auth.user?.role);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ResetPassword />} />
        <Route path="/products" element={<Search />} />
        {user.isAuthenticated ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/checkoutcart" element={<CheckOutCart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/products/viewproduct/:productId" element={<ViewProduct/>}/>
            <Route path="/view/order/:orderID" element={<ViewOrder/>}/>
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        <></>
        {user.isAuthenticated && userRole === "admin" ? (
          <>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
