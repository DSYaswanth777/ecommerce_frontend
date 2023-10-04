import React from "react";
import ProductImg from "../../assets/images/Tops.png";
import { formatCurrency } from "../../utilities/formatCurrency";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import "./Products.scss";
import { BsSuitHeart } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import './Products.scss'
function Products() {
  return (
    <div>
      <div className="productsGri  pt-4">
        <Card
          className="slider-content  "
          style={{
            width: "18rem",
          }}
        >
          <img alt="Sample" src={ProductImg} />
          <CardBody>
            <CardTitle tag="h5">
              {" "}
              Shiffon Cotton Saree with Floral Print
            </CardTitle>
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
          <img alt="Sample" src={ProductImg} />
          <CardBody>
            <CardTitle tag="h5">
              {" "}
              Shiffon Cotton Saree with Floral Print
            </CardTitle>
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
          <img alt="Sample" src={ProductImg} />
          <CardBody>
            <CardTitle tag="h5">
              {" "}
              Shiffon Cotton Saree with Floral Print
            </CardTitle>
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
          <img alt="Sample" src={ProductImg} />
          <CardBody>
            <CardTitle tag="h5">
              {" "}
              Shiffon Cotton Saree with Floral Print
            </CardTitle>
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
          <img alt="Sample" src={ProductImg} />
          <CardBody>
            <CardTitle tag="h5">
              {" "}
              Shiffon Cotton Saree with Floral Print
            </CardTitle>
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
          <img alt="Sample" src={ProductImg} />
          <CardBody>
            <CardTitle tag="h5">
              {" "}
              Shiffon Cotton Saree with Floral Print
            </CardTitle>
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
      </div>
    </div>
  );
}

export default Products;
