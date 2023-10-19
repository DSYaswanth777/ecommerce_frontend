import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import Footer from "../components/Footer/Footer";
import Poster from "../components/Poster/Poster";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  recentProductAsync,
  sortproductsAsync,
} from "../redux/slice/productSlice";
import Categories from "../components/Categories/categories";
function Home() {
  const recentProducts = useSelector((state) => state.products?.recentproducts);
  const filteredProducts = useSelector(
    (state) => state.products?.filteredproducts
  );
  const status = useSelector((state) => state.products?.status);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(recentProductAsync());
    }
  }, [status, dispatch]);
  useEffect(() => {
    if (status === "idle") {
      dispatch(sortproductsAsync("lowtohigh"));
    }
  }, [status, dispatch]);
  return (
    <div>
      <Header />
      <HeroSection />
      <Categories/>
      <Poster
        title="Just In"
        subtitle="New Arrivals for You"
        products={recentProducts}
      />
      <Poster
        title="Best Deals Await"
        subtitle="Discover Affordable Finds: Prices Low to High"
        products={filteredProducts}
      />
      <Footer />
    </div>
  );
}

export default Home;
