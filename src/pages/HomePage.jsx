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
      <Categories/>
      <Poster />
      <Poster />
      <Poster />
      <Footer />

    </div>
  );
}

export default Home;
