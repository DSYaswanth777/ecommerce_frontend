import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { formatCurrency } from "../../utilities/formatCurrency";
import { fetchUserOrders } from "../../redux/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Shimmer } from "react-shimmer";
import { v4 as uuidv4 } from "uuid";
import { ChevronRight } from "react-feather";
import { formatDateForInput } from "../../utilities/FormatInputDate";

function Orders() {
  const ordersData = useSelector((state) => state?.orders?.orders?.orders);
  // console.log(ordersData);
  const status = useSelector((state) => state?.orders?.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserOrders());
    }
  }, [status, dispatch]);

  return (
    <div style={{ overflow: "hidden" }}>
      <h3 className="text-center pt-3 text-uppercase">Your Orders</h3>
      <div className="d-flex container flex-column gap-2 pt-2 pb-5">
        <div className="d-flex gap-4 flex-column flex-md-row pt-3 ">
          <div className="d-flex flex-column gap-3 w-100 ">
            {status === "idle" || status === "loading" ? (
              <Shimmer
                key={uuidv4()}
                visible={true} 
                autoRun={true}
                width={1300}
                height={120}
              >
                <Card
                  className="slider-content"
                  style={{
                    width: "18rem",
                  }}
                > </Card>
              </Shimmer>
            ) : (
              ordersData?.map((order) => (
                <Card
                  className=""
                  key={uuidv4()}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/view/order/${order?.orderID}`)}
                >
                  <CardBody>
                    <div className="d-flex flex-column flex-sm-row  gap-4 justify-content-between align-items-center">
{console.log(order?.cartItems[0].product)}
                       {order?.cartItems?.map((item) => (
                        <img
                          key={uuidv4()} // Use uuid to generate a unique key
                          src={item?.product?.productImages[0]}
                          alt={item?.product?.productName}
                          width={100}
                          height={100}
                        />
                      ))} 
                      <div className="d-flex flex-column">
                        <h6 className="text-muted">
                          {" "}
                          <span className="fw-bold">OrderID:</span>{" "}
                          {order?.orderID}
                        </h6>
                         {order?.cartItems?.map((item) => (
                          <h6
                            key={uuidv4()} 
                          >
                            {item?.product?.productName}
                          </h6>
                        ))} 
                      </div>
                      <div className="d-flex flex-column">
                        <h5>
                          {" "}
                          <span className="me-2"> Total:</span>
                          {formatCurrency(order?.totalAmount)}
                        </h5>
                        <h6 className="text-muted">
                          {order?.paymentStatus === "Successful" ? (
                            <p className="text-success fw-bold text-uppercase">
                              Payment {order?.paymentStatus}
                            </p>
                          ) : (
                            <p>Payment {order?.paymentStatus}</p>
                          )}
                        </h6>
                      </div>
                      <div className="d-flex flex-column">
                        <h6>
                          Ordered on {formatDateForInput(order?.orderDate)}
                        </h6>
                        <>
                          {order?.paymentStatus === "Successful" ? (
                            <p className="text-success fw-bold">
                              {" "}
                              You have placed your order Succesfully
                            </p>
                          ) : (
                            <p className="text-danger">
                              Your order rquest has failed
                            </p>
                          )}
                        </>
                      </div>
                      <ChevronRight />
                    </div>
                  </CardBody>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
