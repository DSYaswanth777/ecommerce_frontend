import React from "react";
import SliderImg from "../../assets/images/heroSliderImg.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./PosterSlider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatCurrency } from "../../utilities/formatCurrency";
const PosterSlider = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <div className=" container pt-5 ">
        <Carousel responsive={responsive} autoPlay>
          <div className="  py-5">
            <div className="slider mb-2 shadow rounded-2">
              <img src={SliderImg} alt="" className="sliderImg rounded-2" />
              <div className=" d-flex flex-column justify-content-center align-items-center p-4 ">
                <h4>Shiffon Saree</h4>
                <h5>{formatCurrency("2500")}</h5>
              </div>
            </div>
          </div>
          <div className=" py-5">
            <div className="slider   mb-2 shadow rounded-2">
              <img src={SliderImg} alt="" className="sliderImg rounded-2" />
              <div className=" d-flex flex-column justify-content-center align-items-center p-4 ">
                <h4>Shiffon Saree</h4>
                <h5>{formatCurrency("2500")}</h5>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="slider   mb-2 shadow rounded-2">
              <img src={SliderImg} alt="" className="sliderImg rounded-2" />
              <div className=" d-flex flex-column justify-content-center align-items-center p-4 ">
                <h4>Shiffon Saree</h4>
                <h5>{formatCurrency("2500")}</h5>
              </div>
            </div>
          </div>
          <div className="  py-5">
            <div className="slider   mb-2 shadow rounded-2">
              <img src={SliderImg} alt="" className="sliderImg rounded-2" />
              <div className=" d-flex flex-column justify-content-center align-items-center p-4 ">
                <h4>Shiffon Saree</h4>
                <h5>{formatCurrency("2500")}</h5>
              </div>
            </div>
          </div>
          <div className="  py-5">
            <div className="slider   mb-2 shadow rounded-2">
              <img src={SliderImg} alt="" className="sliderImg rounded-2" />
              <div className=" d-flex flex-column justify-content-center align-items-center p-4 ">
                <h4>Shiffon Saree</h4>
                <h5>{formatCurrency("2500")}</h5>
              </div>
            </div>
          </div>
          <div className=" py-5">
            <div className="slider   mb-2 shadow rounded-2">
              <img src={SliderImg} alt="" className="sliderImg rounded-2" />
              <div className=" d-flex flex-column justify-content-center align-items-center p-4 ">
                <h4>Shiffon Saree</h4>
                <h5>{formatCurrency("2500")}</h5>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default PosterSlider;
