import React from "react";
import heroSliderImg from "../../assets/images/heroSliderImg.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroSection.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
const HeroSection = () => {
  return (
    <Carousel autoPlay interval="5000" transitionTime="1000" showThumbs={false}  infiniteLoop className="px-2">

      <div>
        <img src={heroSliderImg} className="slider-image" />
        
      </div>
      <div>
        <img src={heroSliderImg} className="slider-image" />
      </div>
      <div>
        <img src={heroSliderImg} className="slider-image" />
      </div>
    </Carousel>
  );
};

export default HeroSection;
