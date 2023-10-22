import React from "react";
import Header from "../Header/Header";
import { Card, CardBody, CardTitle, CardText, Button, Badge } from "reactstrap";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWishlistAsync,
  fetchUserWishlistAsync,
} from "../../redux/slice/wishlistSlice";
import { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { FaCartPlus } from "react-icons/fa";
import "../Products/Products.scss";
import { Trash } from "react-feather";
import { cartAddAsync } from "../../redux/slice/cartSlice";
import { Shimmer } from "react-shimmer";
function Wishlist() {
  const status = useSelector((state) => state.wishlist?.status);
  const wishlistData = useSelector((state) => state.wishlist?.wishlist);
  const dispatch = useDispatch();
  const handleDeleteItem = (itemId) => {
    // Dispatch the delete action
    dispatch(deleteWishlistAsync(itemId))
      .then(() => {
        // After successfully deleting, fetch the updated wishlist
        dispatch(fetchUserWishlistAsync());
      })
      .catch((error) => {
        // Handle any errors, if needed
        console.log(error);
      });
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserWishlistAsync());
    }
  }, [status, dispatch]);
  return (
    <div>
      <Header />
      <div className=" container pt-5">
        <div className="productsGri">
          {status === "loading"
            ? wishlistData.map((product) => (
                <Shimmer
                  key={product._id}
                  visible={true}
                  autoRun={true}
                  width={300}
                  height={300}
                >
                  <Card
                    className="slider-content"
                    style={{
                      width: "18rem",
                    }}
                  ></Card>
                </Shimmer>
              ))
            : wishlistData.map((product) => (
                <Card
                  key={product.product._id}
                  className="slider-content"
                  style={{ width: "18rem" }}
                >
                  <div
                    onClick={() =>
                      navigate(`/products/viewproduct/${product.product._id}`)
                    }
                  >
                    <Carousel
                      showThumbs={false}
                      autoPlay
                      interval="3000"
                      transitionTime="1000"
                    >
                      {product.product.productImages.map((img) => (
                        <img
                          alt="Sample"
                          src={img}
                          width={300}
                          height={300}
                          key={img}
                        />
                      ))}
                    </Carousel>
                  </div>
                  <CardBody>
                    <CardTitle tag="h5">
                      {product.product.productName}
                    </CardTitle>
                    <CardText className="fw-medium fs-5">
                      Price: {formatCurrency(product.product.productPrice)}
                    </CardText>
                    <div className="d-flex justify-content-between">
                      <Badge className="fs-6 mb-3">
                        In Stock {product.product.productStock}
                      </Badge>
                      <Trash
                        className="text-danger"
                        onClick={() => handleDeleteItem(product._id)}
                      />
                    </div>
                    <Button
                      className="addToCartBtn d-flex justify-content-center align-items-center"
                      onClick={() =>
                        dispatch(cartAddAsync(product.product._id))
                      }
                    >
                      <FaCartPlus className="me-2" /> Add To Cart
                    </Button>
                  </CardBody>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
