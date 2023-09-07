import React from "react";
import HeroSlider from "react-slick";
import SliderImg from "../../assets/images/image.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroSection.scss";

const HeroSection = () => {
  const settingsLG = {
    autoplay: true,
    centerMode: true,
    centerPadding: "400px",
    slidesToShow: 1,
    infinite: true,
    slidesToScroll: 1,
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="d-lg-none px-2  overflow-hidden">
        <HeroSlider {...settings}>
          <div className="w-100 h-56 h-md-80 py-3 ">
            <img
              src={SliderImg}
              className=" w-100 h-100 slider-image m-1"
              alt="Image 1"
            />
          </div>
          <div className="w-100 h-56 h-md-80 py-3">
            <img
              src={SliderImg}
              className=" w-100 h-100 slider-image m-1"
              alt="Image 1"
            />
          </div>{" "}
          <div className="w-100 h-56 h-md-80 py-3">
            <img
              src={SliderImg}
              className=" w-100 h-100 slider-image"
              alt="Image 1"
            />
          </div>{" "}
          <div className="w-100 h-56 h-md-80 py-3">
            <img
              src={SliderImg}
              className=" w-100 h-100 slider-image"
              alt="Image 1"
            />
          </div>{" "}
          <div className="w-100 h-56 h-md-80 py-3">
            <img
              src={SliderImg}
              className=" w-100 h-100 slider-image"
              alt="Image 1"
            />
          </div>{" "}
          <div className="w-100 h-56 h-md-80 py-3">
            <img
              src={SliderImg}
              className=" w-100 h-100 slider-image"
              alt="Image 1"
            />
          </div>
          {/* Add more images as needed */}
        </HeroSlider>
      </div>
      <div className="d-none d-lg-block px-2 overflow-hidden">
        <HeroSlider {...settingsLG}>
          {/* Dummy images for the slider */}
          <div className="w-100 h-56 h-md-80 py-3">
            <img
              src={SliderImg}
              className=" w-100 h-100 slider-image m-1"
              alt="Image 1"
            />
          </div>
          <div className="w-100 h-56 h-md-80 py-3">
            <img
              src={SliderImg}
              className=" w-100 h-100 slider-image m-1"
              alt="Image 1"
            />
          </div>{" "}
          <div className="w-100 h-56 h-md-80 py-3">
            <img
              src={SliderImg}
              className=" w-100 h-100 slider-image m-1"
              alt="Image 1"
            />
          </div>{" "}
          <div className="w-100 h-56 h-md-80 py-3">
            <img
              src={SliderImg}
              className=" w-100 h-100 slider-image m-1"
              alt="Image 1"
            />
          </div>{" "}
          <div className="w-100 h-56 h-md-80 py-3">
            <img
              src={SliderImg}
              className=" w-100 h-100 slider-image m-1"
              alt="Image 1"
            />
          </div>{" "}
          <div className="w-100 h-56 h-md-80 py-3">
            <img
              src={SliderImg}
              className=" w-100 h-100 slider-image m-1"
              alt="Image 1"
            />
          </div>
          {/* Add more images as needed */}
        </HeroSlider>
      </div>
    </>
  );
};

export default HeroSection;
