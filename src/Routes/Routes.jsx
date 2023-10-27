import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../components/Login/Login";
import Home from "../pages/HomePage";
import Signup from "../components/SignUp/Signup";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import Search from "../components/Search/Search";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import CheckOutPage from "../pages/CheckOutPage";
import OrdersPage from "../pages/OrdersPage";
import ViewOrderPage from "../pages/ViewOrderPage";
import ProfilePage from "../pages/ProfilePage";
import WishListPage from "../pages/WishListPage";
import ViewProductPage from "../pages/ViewProductPage";
import AllProductsPage from "../pages/AllProductsPage";

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
        <Route path="/products" element={<AllProductsPage />} />
        {user.isAuthenticated ? (
          <>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/wishlist" element={<WishListPage />} />
            <Route path="/products/viewproduct/:productId" element={<ViewProductPage/>}/>
            <Route path="/view/order/:orderID" element={<ViewOrderPage/>}/>
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
