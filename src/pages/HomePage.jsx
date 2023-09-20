import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import PosterSlider from "../components/PosterSlider/PosterSlider";
import Categories from "../components/Categories/Categories";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Poster from "../components/Poster/Poster";
function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <PosterSlider />
      <Categories/>
      <Poster />
      <Poster />
      <Poster />

      <Footer />

    </div>
  );
}

export default Home;
