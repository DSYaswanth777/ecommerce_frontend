import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "react-responsive-carousel";
import { formatCurrency } from "../../utilities/formatCurrency";
import { Button, Input, Badge } from "reactstrap";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import Poster from "../../components/Poster/Poster";
import "./Products.scss";
import { useParams } from "react-router";
import { useEffect } from "react";
import { viewProductAsync } from "../../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";

function ViewProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products?.product);
  useEffect(() => {
    dispatch(viewProductAsync(productId));
  }, [dispatch, productId]);

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
            {product?.productImages.map((img) => (
              <img alt={product.name} src={img} width={400} height={400} />
            ))}
          </Carousel>
        </div>
        <div className="img-carousel">
          <div className="fs-3 text-start">{product?.productName}</div>
          <p className="text-muted fs-5">{product?.subcategoryId.name}</p>
          <p>{product?.productInfo}</p>
          <Badge className="fs-6" color="success">
            {" "}
            Instock ({product?.productStock})
          </Badge>
          <p className="fs-4">{formatCurrency(product?.productPrice)}</p>
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
