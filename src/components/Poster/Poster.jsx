import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
import { useNavigate } from "react-router";
import "./Poster.scss";
import { wishlistAddAsync } from "../../redux/slice/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { cartAddAsync } from "../../redux/slice/cartSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Poster = ({ title, subtitle, products }) => {
  const status = useSelector((state) => state.products?.status);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="container mt-5 pt-3 mb-5 pb-5">
      <h4 className="text-center title">{title}</h4>
      <h2 className="text-center mb-5 subtitle">{subtitle}</h2>
      {products && products.length > 0 && (
        <Carousel responsive={responsive} autoPlay className="pb-3">
          {products.map((product) => (
            <SkeletonTheme
              color="#202020"
              highlightColor="#444"
              key={product._id}
            >
              <Card
                className="slider-content"
                style={{
                  width: "18rem",
                }}
              >
                {status === "loading" ? (
                  <Skeleton height={290} width={285} />
                ) : (
                  <>
                    <img
                      alt={product?.name}
                      src={product?.productImages[0]}
                      width={285}
                      height={290}
                      onClick={() =>
                        navigate(`/products/viewproduct/${product._id}`)
                      }
                    />

                    <CardBody>
                      {status === "loading" ? (
                        <>
                          <Skeleton width={100} height={20} />
                          <Skeleton width={150} height={15} />
                          <Skeleton width={100} height={15} />
                        </>
                      ) : (
                        <>
                          <CardTitle tag="h5">{product?.productName}</CardTitle>
                          <CardSubtitle className="mb-2 text-muted" tag="h6">
                            <div className="d-flex justify-content-between">
                              {product?.subcategoryId.name}
                              <BsSuitHeart
                                size={25}
                                onClick={() =>
                                  dispatch(wishlistAddAsync(product._id))
                                }
                              />
                            </div>
                          </CardSubtitle>
                          <CardText className="fw-medium fs-5">
                            Price: {formatCurrency(product.productPrice)}
                          </CardText>
                          <Button
                            className="addToCartBtn d-flex justify-content-center align-items-center"
                            onClick={() => dispatch(cartAddAsync(product._id))}
                          >
                            <FaCartPlus className="me-2" /> Add To Cart
                          </Button>
                        </>
                      )}
                    </CardBody>
                  </>
                )}
              </Card>
            </SkeletonTheme>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Poster;
