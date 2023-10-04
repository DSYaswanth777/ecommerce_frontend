import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import Categories from "../components/Categories/Categories";
import Footer from "../components/Footer/Footer";
import Poster from "../components/Poster/Poster";
function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <Categories />
      <Poster 
      title="Just In"
      subtitle="New Arrivals for You" 
      />
      <Poster
        title="Dress Materials Collection"
        subtitle="Create Your Perfect Outfit"
      />
      <Poster 
      title="Huge Discount" 
      subtitle="Amazing Deals Await" 
      />
      <Footer />
    </div>
  );
}

export default Home;
