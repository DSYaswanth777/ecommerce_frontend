import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "react-responsive-carousel";
import { formatCurrency } from "../../utilities/formatCurrency";
import { Button, Badge } from "reactstrap";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import Poster from "../../components/Poster/Poster";
import "./Products.scss";
import { useParams } from "react-router";
import { useEffect } from "react";
import { viewProductAsync } from "../../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { cartAddAsync, fetchUsercartAsync } from "../../redux/slice/cartSlice";
import { wishlistAddAsync } from "../../redux/slice/wishlistSlice";

function ViewProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products?.product);

  useEffect(() => {
    dispatch(viewProductAsync(productId));
  }, [dispatch, productId]);
  useEffect(() => {
    dispatch(viewProductAsync(productId));
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, [dispatch, productId]);
  const handleAddCartItem = (productId) => {
    // Dispatch the delete action
    dispatch(cartAddAsync(productId))
      .then(() => {
        // After successfully deleting, fetch the updated wishlist
        dispatch(fetchUsercartAsync());
      })
      .catch((error) => {
        // Handle any errors, if needed
        console.log(error);
      });
  };

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
              <img
                alt={product.name}
                src={img}
                width={400}
                height={400}
                key={product._id}
              />
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
            <Button
              className="text-uppercase"
              style={{ backgroundColor: "#2A798B" }}
              onClick={() => handleAddCartItem(product._id)}
            >
              {" "}
              <FaCartPlus className="me-2" />
              Add To Cart
            </Button>
            <Button
              className="text-uppercase text-white border-0 mt-3"
              style={{ backgroundColor: "#88173E" }}
              onClick={() => dispatch(wishlistAddAsync(product._id))}
            >
              <FaHeart className="me-2 text-white" /> Add To Wishlist
            </Button>
          </div>
        </div>
      </div>
      <Poster
        title="Relevalant Items"
        subtitle="Check Out these"
      />
      <Footer />
    </>
  );
}

export default ViewProduct;
