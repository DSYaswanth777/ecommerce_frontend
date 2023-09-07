import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import PosterSlider from "../components/PosterSlider/PosterSlider";

function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <PosterSlider />
      <PosterSlider />
      <PosterSlider />
    </div>
  );
}

export default Home;
