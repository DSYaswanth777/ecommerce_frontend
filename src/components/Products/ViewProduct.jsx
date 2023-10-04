import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "react-responsive-carousel";
import SliderImg from "../../assets/images/dress_materials.png";
import { formatCurrency } from "../../utilities/formatCurrency";
import { Button, Input } from "reactstrap";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import Poster from "../../components/Poster/Poster";
import "./Products.scss";
function ViewProduct() {
  return (
    <>
      <Header />
      <div className="d-flex container flex-column flex-sm-column flex-lg-row gap-5 pt-3">
        <div className="img-carousel">
          <Carousel
            autoPlay
            interval="5000"
            transitionTime="1000"
            infiniteLoop
            showThumbs={false}
          >
            <div className="">
              <img src={SliderImg} alt="" width={400} height={400} />
            </div>
            <div className="">
              <img src={SliderImg} alt="" width={400} height={400} />
            </div>
            <div className="">
              <img src={SliderImg} alt="" width={400} height={400} />
            </div>
          </Carousel>
        </div>
        <div className="img-carousel">
          <div className="fs-3 text-start">
            Shiffon Cotton Saree with Floral Print
          </div>
          <p className="text-muted fs-5">Saree </p>
          <p>
            Product Info: Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Nesciunt totam voluptate eaque veniam tempora voluptas non eos
            libero rerum laborum provident necessitatibus similique tenetur
            dolore corporis aspernatur, esse distinctio iste!
          </p>
          <p className="fs-4">{formatCurrency("2000")}</p>
          <div className="d-flex gap-3">
            <Button className="btn-sm">-</Button>
            <Input type="text" style={{ width: "40px", height: "40px" }} />
            <Button className="btn-sm">+</Button>
            <Button
              className="text-uppercase"
              style={{ backgroundColor: "#2A798B" }}
            >
              {" "}
              <FaCartPlus className="me-2" />
              Add To Cart
            </Button>
          </div>
          <Button
            className="text-uppercase text-white border-0 mt-3"
            style={{ backgroundColor: "#88173E" }}
          >
            <FaHeart className="me-2 text-white" /> Add To Wishlist
          </Button>
        </div>
      </div>
      <Poster title="Relevalant Items" subtitle="Check Out these" />
      <Footer />
    </>
  );
}

export default ViewProduct;
