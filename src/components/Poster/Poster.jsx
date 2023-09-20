import React from "react";
import SliderImg from "../../assets/images/heroSliderImg.jpg";
import "./Poster.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatCurrency } from "../../utilities/formatCurrency";
import { FaCartPlus } from "react-icons/fa";
const Poster = () => {
  const responsive = {
    superLargeDesktop: {
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
      <div className=" container  ">
        <h4 className="text-center">Our New Collection</h4>
        <h2 className="text-center">Our Newest Additions to our Collection</h2>
        <Carousel responsive={responsive} autoPlay>
          <div className="  py-5">
            <div className="displaySlider   mb-2    rounded-2">
              <img
                src={SliderImg}
                alt=""
                className="displaySliderImg "
                style={{ height: "400px", width: "300px" }}
              />
              <div className=" d-flex flex-column justify-content-center align-items-start py-2 ">
                <p>Saree</p>
                <h6>A beautiful Red Saree</h6>
                <h5>MRP {formatCurrency("2500")}</h5>
                <button className="text-uppercase addToCartBtn d-flex justify-content-center align-items-center p-2 rounded bg-white">
                  {" "}
                  <FaCartPlus className="me-2" /> Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className="  py-5">
            <div className="displaySlider   mb-2    rounded-2">
              <img
                src={SliderImg}
                alt=""
                className="displaySliderImg "
                style={{ height: "400px", width: "300px" }}
              />
              <div className=" d-flex flex-column justify-content-center align-items-start py-2 ">
                <p>Saree</p>
                <h6>A beautiful Red Saree</h6>
                <h5>MRP {formatCurrency("2500")}</h5>
                <button className="text-uppercase addToCartBtn d-flex justify-content-center align-items-center p-2 rounded bg-white">
                  {" "}
                  <FaCartPlus className="me-2" /> Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className="  py-5">
            <div className="displaySlider   mb-2    rounded-2">
              <img
                src={SliderImg}
                alt=""
                className="displaySliderImg "
                style={{ height: "400px", width: "300px" }}
              />
              <div className=" d-flex flex-column justify-content-center align-items-start py-2 ">
                <p>Saree</p>
                <h6>A beautiful Red Saree</h6>
                <h5>MRP {formatCurrency("2500")}</h5>
                <button className="text-uppercase addToCartBtn d-flex justify-content-center align-items-center p-2 rounded bg-white">
                  {" "}
                  <FaCartPlus className="me-2" /> Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className="  py-5">
            <div className="displaySlider   mb-2    rounded-2">
              <img
                src={SliderImg}
                alt=""
                className="displaySliderImg "
                style={{ height: "400px", width: "300px" }}
              />
              <div className=" d-flex flex-column justify-content-center align-items-start py-2 ">
                <p>Saree</p>
                <h6>A beautiful Red Saree</h6>
                <h5>MRP {formatCurrency("2500")}</h5>
                <button className="text-uppercase addToCartBtn d-flex justify-content-center align-items-center p-2 rounded bg-white">
                  {" "}
                  <FaCartPlus className="me-2" /> Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className="  py-5">
            <div className="displaySlider   mb-2    rounded-2">
              <img
                src={SliderImg}
                alt=""
                className="displaySliderImg "
                style={{ height: "400px", width: "300px" }}
              />
              <div className=" d-flex flex-column justify-content-center align-items-start py-2 ">
                <p>Saree</p>
                <h6>A beautiful Red Saree</h6>
                <h5>MRP {formatCurrency("2500")}</h5>
                <button className="text-uppercase addToCartBtn d-flex justify-content-center align-items-center p-2 rounded bg-white">
                  {" "}
                  <FaCartPlus className="me-2" /> Add To Cart
                </button>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Poster;
