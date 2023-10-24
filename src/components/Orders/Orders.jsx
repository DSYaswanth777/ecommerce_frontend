import React, { useEffect } from "react";
import Header from "../Header/Header";
import { Card, CardBody } from "reactstrap";
import { formatCurrency } from "../../utilities/formatCurrency";
import { fetchUserOrders } from "../../redux/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { Shimmer } from "react-shimmer";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid

function Orders() {
  const ordersData = useSelector((state) => state?.orders?.orders?.orders);
  const status = useSelector((state) => state?.orders?.status);
  const memoizedOrdersData = useMemo(() => ordersData, [ordersData]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "idle" ) {
      dispatch(fetchUserOrders());
    }
  }, [status, dispatch]);
  const formatDateForInput = (isoDate) => {
    if (!isoDate) {
      return "";
    }

    const date = new Date(isoDate);

    if (isNaN(date.getTime())) {
      return ""; // Handle invalid date
    }

    return format(date, "dd/MM/yyyy");
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Header />
      <h3 className="text-center pt-3 text-uppercase">My Orders</h3>
      <div className="d-flex container flex-column gap-2 pt-2 pb-5">
        <div className="d-flex gap-4 flex-column flex-md-row pt-3 ">
          <div className="d-flex flex-column gap-3 w-100 ">
            {status === "loading" || status === "idle"
              ? memoizedOrdersData?.map((order) => (
                  <Shimmer
                    key={order.orderID}
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
                    ></Card>
                  </Shimmer>
                ))
              : memoizedOrdersData?.map((order) => (
                  <Card
                    className=""
                    key={uuidv4()} // Use uuid to generate a unique key
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/view/order/${order?.orderID}`)}
                  >
                    <CardBody>
                      <div className="d-flex flex-column flex-sm-row  gap-4 justify-content-between align-items-center">
                        {order?.cartItems?.map((item) => (
                          <img
                            key={uuidv4()} // Use uuid to generate a unique key
                            src={item?.product?.productImages[0]}
                            alt=""
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
                              key={uuidv4()} // Use uuid to generate a unique key
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
                      </div>
                    </CardBody>
                  </Card>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
