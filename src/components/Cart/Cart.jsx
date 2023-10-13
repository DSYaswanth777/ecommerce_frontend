import React from "react";
import { Button, CardBody, Input, Badge } from "reactstrap";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useEffect } from "react";
import {
  cartQuantityDecreaseAsync,
  cartQuantityIncreaseAsync,
  fetchUsercartAsync,
} from "../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
function Cart() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.cart?.status);
  const cartData = useSelector((state) => state.cart?.cart?.cartItems);
  const cartTotalFee = useSelector((state) => state.cart?.cart.totalFee);
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsercartAsync());
    }
  }, [status, dispatch]);


  return (
    <>
      <div className="d-flex flex-column">
        <div className="px-2">
          {cartData?.map((product) => (
            <CardBody className="">
              <div className="d-flex gap-4 justify-content-center align-items-center py-3">
                <img
                  alt={product.product.prod}
                  src={product.product.productImages[0]}
                  width={120}
                  height={120}
                />
                <div className="d-flex flex-column justify-content-start  gap-3 align-items-start ">
                  <h6>{product.product.productName}</h6>
                  <Badge
                    style={{ backgroundColor: "#2D7B8B" }}
                    color="bg-success"
                  >
                    In Stock {product.product.productStock}
                  </Badge>
                  <div className="d-flex gap-3">
                    <Button
                      className="btn-sm fw-bold"
                      style={{ backgroundColor: "#2D7B8B" }}
                      onClick={() =>
                        dispatch(cartQuantityDecreaseAsync(product._id))
                      }
                    >
                      -
                    </Button>
                    <Input
                      className=""
                      value={product.quantity}
                      style={{ width: "40px", height: "30px" }}
                      disabled
                    ></Input>
                    <Button
                      className="btn-sm fw-bold"
                      style={{ backgroundColor: "#2D7B8B" }}
                      onClick={() =>
                        dispatch(cartQuantityIncreaseAsync(product._id))
                      }
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
          ))}
          <hr />

          <div className="d-flex gap-2 pb-3">
            <h5>SubTotal:</h5> <h5>{formatCurrency(cartTotalFee)}</h5>
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <Button style={{ backgroundColor: "#2D7B8B" }}>
            {" "}
            <a href="/checkoutcart" className="text-white ">
              View Cart
            </a>
          </Button>
          <Button style={{ backgroundColor: "#2D7B8B" }}>
            Proceed To CheckOut
          </Button>
        </div>
      </div>
    </>
  );
}

export default Cart;
