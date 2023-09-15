import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import PosterSlider from "../components/PosterSlider/PosterSlider";
import Categories from "../components/Categories/Categories";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar"
function Home() {
  return (
    <div>
      <Header />
      {/* <Navbar/> */}
      <HeroSection />
      <PosterSlider />
      <PosterSlider />

      {/* <PosterSlider /> */}
      {/* <PosterSlider /> */}
      <Footer />
      {/* <PosterSlider /> */}
      {/* <PosterSlider /> */}
    </div>
  )
}

export default Home;
