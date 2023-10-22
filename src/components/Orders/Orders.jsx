import React, { useEffect } from "react";
import Header from "../Header/Header";
import { Button, Card, CardBody, CardTitle, Input, Label } from "reactstrap";
import { formatCurrency } from "../../utilities/formatCurrency";
import { fetchUserOrders } from "../../redux/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { ChevronRight } from "react-feather";
import { Shimmer } from "react-shimmer";
import { useNavigate } from "react-router";

function Orders() {
  const ordersData = useSelector((state) => state?.orders?.orders?.orders);
  console.log(ordersData)
  const status = useSelector((state) => state?.orders?.status);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    if (status === "idle") {
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
    <div>
      <Header />
      <div className="d-flex container flex-column gap-2 pt-5">
        <div className="d-flex">
          <Input className="w-100 me-3" placeholder="Search for Your Order" />
          <Button>Search</Button>
        </div>

        <div className="d-flex gap-4 flex-column flex-md-row pt-3 ">
          <div className="">
            <Card className="p-3 pe-4 bg-light">
              <CardTitle className="fs-5 ms-4  text-uppercase fw-bold">
                Filters
              </CardTitle>
              <CardBody className="d-flex  flex-column">
                <Label for="filter" className="ms-2">
                  <Input type="checkbox" name="filter" className="me-2" />
                  Ordered
                </Label>
                <Label for="filter" className="ms-2">
                  <Input type="checkbox" name="filter" className="me-2" />
                  On the way
                </Label>
                <Label for="filter" className="ms-2">
                  <Input type="checkbox" name="filter" className="me-2" />
                  Failed
                </Label>
              </CardBody>
            </Card>
          </div>
          <div className="d-flex flex-column gap-3 ">
            {ordersData?.map((order) => (
              <Card className="" key={order._id} style={{ cursor: "pointer" }}
              onClick={()=>navigate(`/view/order/${order?.orderID}`)}
              >
                <CardBody>
                  <div className="d-flex flex-column flex-sm-row  gap-4 justify-content-between align-items-center">
                    {order?.cartItems?.map((item) => (
                      <img
                        key={item.product._id}
                        src={item?.product?.productImages[0]} // Access the first image
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
                        <h6 key={item.product._id}>
                          {item?.product?.productName}
                        </h6>
                      ))}
                    </div>
                    <div className="d-flex flex-column">
                      <h5>{formatCurrency(order.totalAmount)}</h5>
                      <h6 className="text-muted">
                        Payment {order?.paymentStatus}
                      </h6>
                    </div>
                    <div className="d-flex flex-column">
                      <h6>Ordered on {formatDateForInput(order?.orderDate)}</h6>
                      <p>You have succesfully placed your order</p>
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
