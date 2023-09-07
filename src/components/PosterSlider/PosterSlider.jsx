import React from "react";
import Poster from "react-slick";
import SliderImg from "../../assets/images/image.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import settings from "../../config/PosterCarosuelSettings";
// import "./HeroSection.scss";

const PosterSlider = () => {

  return (
    <>
      <div className="d-lg-none px-2 overflow-hidden">
        <Poster {...settings}>
          <div className="w-100 h-56 h-md-80 py-3    ">
            <img
              src={SliderImg}
              className=" w-100 h-100 slider-image"
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
        </Poster>
      </div>
      <div className="d-none d-lg-block px-2 overflow-hidden">
        <Poster {...settings}>
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
        </Poster>
      </div>
    </>
  );
};

export default PosterSlider;
