import React from "react";
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
import "./Products.scss";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router";
import ViewProduct from "./ViewProduct";

function Products({ productData }) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="productsGri  pt-4">
        {productData?.map((product, index) => (
          <Card
            key={index}
            className="slider-content  "
            onClick={() => navigate("/viewproduct")}
            style={{
              width: "18rem",
            }}
          >
            <Carousel
              showThumbs={false}
              autoPlay
              interval="3000"
              transitionTime="1000"
            >
              {product.productImages.map((img) => (
                <img alt="Sample" src={img} width={300} height={300} />
              ))}
            </Carousel>
            <CardBody>
              <CardTitle tag="h5"> {product.productName}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                <div className="d-flex justify-content-between ">
                  {product.subcategoryId.name}
                  <BsSuitHeart size={25} />
                </div>
              </CardSubtitle>
              <CardText className="fw-medium fs-5">
                Price :{formatCurrency(product.productPrice)}
              </CardText>
              <Button className="addToCartBtn d-flex justify-content-center align-items-center">
                <FaCartPlus className="me-2" /> Add To Cart
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;
