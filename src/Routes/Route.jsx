import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
const Route = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgotpassword" element={<ResetPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/checkoutcart" element={<CheckOutCart/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Route;
