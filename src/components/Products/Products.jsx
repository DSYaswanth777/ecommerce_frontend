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
import { BsSuitHeart } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router";
import "./Products.scss";
import { useDispatch, useSelector } from "react-redux";
import { wishlistAddAsync } from "../../redux/slice/wishlistSlice";
import { cartAddAsync, fetchUsercartAsync } from "../../redux/slice/cartSlice";
import { Shimmer } from "react-shimmer";
function Products({ productData }) {
  const status = useSelector((state) => state?.products?.status);
  const dispatch = useDispatch();
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
  const navigate = useNavigate();
  return (
    <div>
      <div className="productsGri  pt-4">
        {status === "loading"
          ? productData?.map((product) => (
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
          : productData?.map((product) => (
              <Card
                key={product._id}
                className="slider-content  "
                style={{
                  width: "18rem",
                }}
              >
                <div
                  onClick={() =>
                    navigate(`/products/viewproduct/${product._id}`)
                  }
                >
                  <Carousel
                    showThumbs={false}
                    autoPlay
                    interval="3000"
                    transitionTime="1000"
                  >
                    {product?.productImages.map((img) => (
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
                  <CardTitle tag="h5">{product?.productName}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    <div className="d-flex justify-content-between ">
                      {product?.subcategoryId?.name}

                      <BsSuitHeart
                        size={25}
                        onClick={() => dispatch(wishlistAddAsync(product._id))}
                      />
                    </div>
                  </CardSubtitle>
                  <CardText className="fw-medium fs-5">
                    Price :{formatCurrency(product?.productPrice)}
                  </CardText>
                  <Button className="addToCartBtn d-flex justify-content-center align-items-center">
                    <FaCartPlus
                      className="me-2"
                      onClick={() => handleAddCartItem(product._id)}
                    />{" "}
                    Add To Cart
                  </Button>
                </CardBody>
              </Card>
            ))}
      </div>
    </div>
  );
}

export default Products;
