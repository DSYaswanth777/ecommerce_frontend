import React, { useEffect, useState } from "react";
import { Button, CardBody, Input, Badge } from "reactstrap";
import { formatCurrency } from "../../utilities/formatCurrency";
import {
  cartQuantityDecreaseAsync,
  cartQuantityIncreaseAsync,
  deletecartAsync,
  fetchUsercartAsync,
} from "../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Trash } from "react-feather";
import Lottie from "lottie-react";
import EmptyCart from "../../assets/icons/EmptyCart.json";
import { useNavigate } from "react-router";
function Cart({ cartData, cartTotalFee }) {
  const status = useSelector((state) => state?.cart?.status);
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleDecrease = async (productId) => {
    setLoading(true);
    await dispatch(cartQuantityDecreaseAsync(productId));
    setLoading(false);
    if (!loading) {
      dispatch(fetchUsercartAsync());
    }
  };

  const handleIncrease = async (productId) => {
    setLoading(true);
    await dispatch(cartQuantityIncreaseAsync(productId));
    setLoading(false);
    if (!loading) {
      dispatch(fetchUsercartAsync());
    }
  };

  const handleDelete = async (productId) => {
    setLoading(true);
    await dispatch(deletecartAsync(productId));
    setLoading(false);
    if (!loading) {
      dispatch(fetchUsercartAsync());
    }
  };
  return (
    <div className="d-flex flex-column">
      <div className="px-2">
        {status === "loading"  ? (
          <Lottie animationData={EmptyCart} />
        ) : cartData?.length === 0 ? (
          <>
            <Lottie animationData={EmptyCart} />
            <p className="text-center text-secondary">Your Cart is Empty</p>
          </>
        ) : (
          cartData?.map((product) => (
            <CardBody key={product._id}>
              <div className="d-flex gap-4 justify-content-center align-items-center py-3">
                <img
                  alt={product?.product?.productName}
                  src={product?.product?.productImages[0]}
                  width={120}
                  height={120}
                />
                <div className="d-flex flex-column justify-content-start gap-3 align-items-start">
                  <div className="d-flex justify-content-between gap-4">
                    <h6>{product.product.productName}</h6>
                    <Trash
                      className="text-danger"
                      size={20}
                      onClick={() => handleDelete(product._id)}
                    />
                  </div>
                  <Badge
                    style={{ backgroundColor: "#2D7B8B" }}
                    color="bg-success"
                  >
                    In Stock {product.product.productStock}
                  </Badge>
                  <div className="d-flex gap-2">
                    <Button
                      className="btn-sm fw-bold"
                      style={{ backgroundColor: "#2D7B8B" }}
                      onClick={() => handleDecrease(product._id)}
                    >
                      -
                    </Button>
                    <Input
                      className=""
                      value={product.quantity}
                      style={{ width: "40px", height: "30px" }}
                      disabled
                    />
                    <Button
                      className="btn-sm fw-bold"
                      style={{ backgroundColor: "#2D7B8B" }}
                      onClick={() => handleIncrease(product._id)}
                    >
                      +
                    </Button>
                  </div>
                  <div>
                    {" "}
                    <span className="pe-2 fs-5 fw-medium">Price:</span>{" "}
                    {formatCurrency(product.product.productPrice)}
                  </div>
                </div>
              </div>
            </CardBody>
          ))
        )}

        {cartData?.length > 0 && (
          <>
            <hr />
            <div className="d-flex gap-2 pb-3">
              <h5>SubTotal:</h5> <h5>{formatCurrency(cartTotalFee)}</h5>
            </div>
          </>
        )}
      </div>

      <div className="d-flex flex-column gap-3">
        {cartData?.length > 0 && (
          <Button
            style={{ backgroundColor: "#2D7B8B" }}
            onClick={() => navigate("/cart")}
          >
            {" "}
            <p className="text-white ">View Cart</p>
          </Button>
        )}
        {cartData?.length > 0 && (
          <Button
            style={{ backgroundColor: "#2D7B8B" }}
            onClick={() => navigate("/checkout")}
          >
            Proceed To CheckOut
          </Button>
        )}
      </div>
    </div>
  );
}

export default Cart;
