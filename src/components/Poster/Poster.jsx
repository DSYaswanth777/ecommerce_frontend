import React from "react";
import SliderImg from "../../assets/images/long_frocks.png";
import "./Poster.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  Button,
} from "reactstrap";
import { formatCurrency } from "../../utilities/formatCurrency";
import { FaCartPlus } from "react-icons/fa";
import { BsSuitHeart } from "react-icons/bs";
import { Eye } from "react-feather";
const Poster = ({title,subtitle}) => {
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
      <div className=" container mt-5 pt-3 mb-5 pb-5 ">
        <h4 className="text-center title">{title}</h4>
        <h2 className="text-center mb-5 subtitle">{subtitle}</h2>
        <Carousel responsive={responsive} autoPlay >
          <Card
            className="slider-content  "
            style={{
              width: "18rem",
            }}
          >
            <img alt="Sample" src={SliderImg} />
            <CardBody >
              <CardTitle tag="h5">   Shiffon Cotton Saree with Floral Print</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                <div className="d-flex justify-content-between ">
                  Saree
                  <BsSuitHeart size={25} />
                </div>
              </CardSubtitle>
              <CardText className="fw-medium fs-5">
                Price :{formatCurrency("5000")}
              </CardText>
              <Button className="addToCartBtn d-flex justify-content-center align-items-center">
                <FaCartPlus className="me-2" /> Add To Cart
              </Button>
            </CardBody>
          </Card>
          <Card
            className="slider-content  "
            style={{
              width: "18rem",
            }}
          >
            <img alt="Sample" src={SliderImg} />
            <CardBody>
              <CardTitle tag="h5">   Shiffon Cotton Saree with Floral Print</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                <div className="d-flex justify-content-between ">
                  Saree
                  <BsSuitHeart size={25} style={{cursor:"pointer"}}/>
                </div>
              </CardSubtitle>
              <CardText className="fw-medium fs-5">
                Price :{formatCurrency("5000")}
              </CardText>
              <Button className="addToCartBtn d-flex justify-content-center align-items-center">
                <FaCartPlus className="me-2" /> Add To Cart
              </Button>
            </CardBody>
          </Card>
          <Card
            className="slider-content  "
            style={{
              width: "18rem",
            }}
          >
            <img alt="Sample" src={SliderImg} />
            <CardBody>
              <CardTitle tag="h5">   Shiffon Cotton Saree with Floral Print</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                <div className="d-flex justify-content-between ">
                  Saree
                  <BsSuitHeart size={25} />
                </div>
              </CardSubtitle>
              <CardText className="fw-medium fs-5">
                Price :{formatCurrency("5000")}
              </CardText>
              <Button className="addToCartBtn d-flex justify-content-center align-items-center">
                <FaCartPlus className="me-2" /> Add To Cart
              </Button>
            </CardBody>
          </Card>
          <Card
            className="slider-content  "
            style={{
              width: "18rem",
            }}
          >
            <img alt="Sample" src={SliderImg} />
            <CardBody>
              <CardTitle tag="h5">   Shiffon Cotton Saree with Floral Print</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                <div className="d-flex justify-content-between ">
                  Saree
                  <BsSuitHeart size={25} />
                </div>
              </CardSubtitle>
              <CardText className="fw-medium fs-5">
                Price :{formatCurrency("5000")}
              </CardText>
              <Button className="addToCartBtn d-flex justify-content-center align-items-center">
                <FaCartPlus className="me-2" /> Add To Cart
              </Button>
            </CardBody>
          </Card>
          <Card
            className="slider-content  "
            style={{
              width: "18rem",
            }}
          >
            <img alt="Sample" src={SliderImg} />
            <CardBody>
              <CardTitle tag="h5">   Shiffon Cotton Saree with Floral Print</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                <div className="d-flex justify-content-between ">
                  Saree
                  <BsSuitHeart size={25} />
                </div>
              </CardSubtitle>
              <CardText className="fw-medium fs-5">
                Price :{formatCurrency("5000")}
              </CardText>
              <Button className="addToCartBtn d-flex justify-content-center align-items-center">
                <FaCartPlus className="me-2" /> Add To Cart
              </Button>
            </CardBody>
          </Card>
          <Card
            className="slider-content  "
            style={{
              width: "18rem",
            }}
          >
            <img alt="Sample" src={SliderImg} />
            <CardBody>
              <CardTitle tag="h5">   Shiffon Cotton Saree with Floral Print</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                <div className="d-flex justify-content-between ">
                  Saree
                  <BsSuitHeart size={25} />
                </div>
              </CardSubtitle>
              <CardText className="fw-medium fs-5">
                Price :{formatCurrency("5000")}
              </CardText>
              <Button className="addToCartBtn d-flex justify-content-center align-items-center">
                <FaCartPlus className="me-2" /> Add To Cart
              </Button>
            </CardBody>
          </Card>
        </Carousel>
      </div>
    </>
  );
};

export default Poster;
