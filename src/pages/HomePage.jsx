import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import Categories from "../components/Categories/Categories";
import Footer from "../components/Footer/Footer";
import Poster from "../components/Poster/Poster";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  recentProductAsync,
  sortproductsAsync,
} from "../redux/slice/productSlice";
function Home() {
  const recentProducts = useSelector((state) => state.products?.products);
  const status = useSelector((state) => state.products?.status);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(recentProductAsync());
    }
  }, [status, dispatch]);
  useEffect(() => {
    if (status === "idle") {
      dispatch(sortproductsAsync());
    }
  }, [status, dispatch]);
  return (
    <div>
      <Header />
      <HeroSection />
      <Categories />
      <Poster
        title="Just In"
        subtitle="New Arrivals for You"
        products={recentProducts}
      />
      {/* <Poster
        title="Items Under Budget"
        subtitle="Get It fast"
        products={sortedproducts}
      /> */}
      <Footer />
    </div>
  );
}

export default Home;
