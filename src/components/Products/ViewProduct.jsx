import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "react-responsive-carousel";
import { formatCurrency } from "../../utilities/formatCurrency";
import { Button, Badge, Card, Spinner } from "reactstrap";
import { FaCartPlus } from "react-icons/fa";
import Poster from "../../components/Poster/Poster";
import "./Products.scss";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import {
  recentProductAsync,
  viewProductAsync,
} from "../../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { cartAddAsync, fetchUsercartAsync } from "../../redux/slice/cartSlice";
import {
  deleteWishlistAsync,
  fetchUserWishlistAsync,
  wishlistAddAsync,
} from "../../redux/slice/wishlistSlice";
import { BsFillHeartFill, BsSuitHeart } from "react-icons/bs";
import toast from "react-hot-toast";
import { Shimmer } from "react-shimmer";
import { ArrowLeft } from "react-feather";

function ViewProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products?.product);
  const productStatus = useSelector((state) => state.products?.status);
  const recentproducts = useSelector((state) => state.products?.recentproducts);
  const wishlist = useSelector((state) => state?.wishlist?.wishlist);
  const status = useSelector((state) => state?.wishlist?.status);
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const isLowStock = product?.productStock < 20; // Check if product stock is less than 20

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(viewProductAsync(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(viewProductAsync(productId));
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, [dispatch, productId]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserWishlistAsync());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(recentProductAsync());
    }
  }, [status, dispatch]);
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

  useEffect(() => {
    // Check if the product is in the wishlist
    const isProductInWishlist = wishlist.some(
      (wishlistItem) => wishlistItem.product._id === productId
    );
    setWishlistAdded(isProductInWishlist);
  }, [wishlist, productId]);

  const handleAddToWishlist = () => {
    if (wishlistAdded) {
      // If the product is already in the wishlist, remove it
      dispatch(deleteWishlistAsync(product._id))
        .then(() => {
          // Wishlist delete was successful
          setWishlistAdded(false); // Update the state to indicate that the product is not in the wishlist
        })
        .catch((error) => {
          // Handle any errors, if needed
          toast.error(error);
        });
    } else {
      // If the product is not in the wishlist, add it
      dispatch(wishlistAddAsync(product._id))
        .then(() => {
          // Wishlist add was successful
          setWishlistAdded(true); // Update the state to indicate that the product is in the wishlist
        })
        .catch((error) => {
          // Handle any errors, if needed
          toast.error(error);
        });
    }
  };

  return (
    <>
      <div className="container">
        <ArrowLeft
          size={30}
          className=" mt-3"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/products")}
        />
      </div>
      <div className="d-flex container flex-column flex-sm-column flex-lg-row gap-5 pt-3">
        <div className="img-carousel">
          {productStatus === "loading" || status === "idle" ? (
            <Shimmer
              key={product?.product?._id}
              visible={true}
              autoRun={true}
              width={400}
              height={400}
            >
              <Card
                className="slider-content"
                style={{
                  width: "18rem",
                }}
              ></Card>
            </Shimmer>
          ) : (
            <Carousel
              autoPlay
              interval="5000"
              transitionTime="1000"
              infiniteLoop
              showThumbs={false}
            >
              {product?.productImages?.map((img) => (
                <img
                  alt={product?.name}
                  src={img}
                  width={400}
                  height={400}
                  key={product._id}
                />
              ))}
            </Carousel>
          )}
        </div>
        <div className="img-carousel">
          <div className="fs-3 text-start d-flex gap-5 ">
            <span className="me-5 pe-5">{product?.productName}</span>
            {status === "loading" || status === "idle" ? (
              <Spinner />
            ) : (
              <span style={{ cursor: "pointer" }}>
                {wishlistAdded ? (
                  <BsFillHeartFill
                    size={25}
                    className="text-danger"
                    onClick={handleAddToWishlist}
                  />
                ) : (
                  <BsSuitHeart size={25} onClick={handleAddToWishlist} />
                )}
              </span>
            )}
          </div>
          {status === "loading" || status === "idle" ? (
            <Shimmer
              key={product?.subcategoryId.name}
              visible={true}
              autoRun={true}
              width={200}
              height={50}
            >
              <Card
                className="slider-content"
                style={{
                  width: "18rem",
                }}
              ></Card>
            </Shimmer>
          ) : (
            <p className="text-muted fs-5">{product?.subcategoryId.name}</p>
          )}
          {status === "loading" || status === "idle" ? (
            <Shimmer
              key={product?.productInfo}
              visible={true}
              autoRun={true}
              width={400}
              height={150}
            >
              <Card
                className="slider-content"
                style={{
                  width: "18rem",
                }}
              ></Card>
            </Shimmer>
          ) : (
            <p>{product?.productInfo}</p>
          )}
          {status === "loading" || status === "idle" ? (
            <Shimmer
              key={product?.productInfo}
              visible={true}
              autoRun={true}
              width={150}
              height={50}
            >
              <Card
                className="slider-content"
                style={{
                  width: "18rem",
                }}
              ></Card>
            </Shimmer>
          ) : (
            <Badge
              className={`fs-6 ${isLowStock ? "bg-danger" : ""}`}
              color="success"
            >
              {" "}
              Instock ({product?.productStock})
            </Badge>
          )}
          {status === "loading" || status === "idle" ? (
            <Shimmer
              key={product?.productInfo}
              visible={true}
              autoRun={true}
              width={150}
              height={50}
            >
              <Card
                className="slider-content"
                style={{
                  width: "18rem",
                }}
              ></Card>
            </Shimmer>
          ) : (
            <p className="fs-4">{formatCurrency(product?.productPrice)}</p>
          )}
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
          </div>
        </div>
      </div>
      <Poster
        title="Recently Added"
        subtitle="Check Out these"
        products={recentproducts}
      />
      <Footer />
    </>
  );
}

export default ViewProduct;
