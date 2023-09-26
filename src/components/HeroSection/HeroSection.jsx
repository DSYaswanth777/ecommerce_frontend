import React from "react";
import heroSliderImg from "../../assets/images/Online Fashion Store.png";
import heroSliderImg2 from "../../assets/images/2.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroSection.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const HeroSection = () => {
  return (
    <div className="pt-1">
      <Carousel
        autoPlay
        interval="5000"
        transitionTime="1000"
        showThumbs={false}
        infiniteLoop
        className="px-2"
      >
        <div className="">
          <img src={heroSliderImg} className="slider-image" />
          {/* <img src={heroSliderImg2} className="slider-image" /> */}
        </div>

        <div className="">
          <img src={heroSliderImg2} className="slider-image" />
          {/* <img src={heroSliderImg} className="slider-image" /> */}
        </div>
      </Carousel>
    </div>
  );
};

export default HeroSection;
