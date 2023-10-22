import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "react-responsive-carousel";
import { formatCurrency } from "../../utilities/formatCurrency";
import { Button, Badge } from "reactstrap";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewOrderAsync } from "../../redux/slice/orderSlice";
import { format } from "date-fns";


function ViewOrder() {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state?.orders?.order?.order); // Change from 'orders' to 'order'
  console.log(orderData);

  useEffect(() => {
    dispatch(viewOrderAsync(orderID));
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, [dispatch, orderID]);

  const formatDateForInput = (isoDate) => {
    if (!isoDate) {
      return ""; // Handle empty date
    }
  
    const date = new Date(isoDate);
  
    if (isNaN(date.getTime())) {
      return ""; // Handle invalid date
    }
  
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };
  
  return (
    <>
      <Header />
      <div className="d-flex container flex-column flex-sm-column  flex-lg-row gap-5 pt-3">
  
        <div className="bg-white">
        {orderData?.cartItems?.map((prod) =>
                <img
                  alt={prod?.product?.productName}
                  src={prod.product.productImages[0]}
                  width={100}
                  height={100}
                  className="me-3"
                  key={prod.product._id}
                />
            )}
          {orderData?.cartItems?.map((prod) => (
            <>
              <div className="fs-3 text-start fw-bold" key={prod.product._id}>
                {prod?.product?.productName}
              </div>
              <p className="text-muted fs-5">
                {prod?.product?.subcategoryId?.name}
              </p>
              <p className="text-start fs-5">
                Price: &nbsp;{prod?.quantity} X
                {formatCurrency(prod?.product?.productPrice)}/-
              </p>
            </>
          ))}
          <div>
            <h5>Total: &nbsp;{formatCurrency(orderData?.totalAmount)}/-</h5>
            <p className="text-small text-muted">
              * Includes Standard Delivery Charges ₹50/-
            </p>
          </div>
        </div>
        <div className="bg-white p-3 border h-50  shadow-sm">
          <h5 className="text-uppercase">Order Details:</h5>
          <p> <span className="fw-bold me-2">Order Date:</span>{formatDateForInput(orderData?.orderDate)}</p>
          <p className="text-muted"> <span className="fw-bold me-2 text-muted">Order ID:</span>{orderData?.orderID}</p>
         
          <div className="">
          <h6>Shipping Address:</h6>
          <div className="d-flex flex-column">
            <span>{orderData?.shippingAddress?.fullName}</span>
            <span>{orderData?.shippingAddress?.landmark}</span>
            <span>{orderData?.shippingAddress?.streetAddress}</span>
            <span>{orderData?.shippingAddress?.townCity}</span>
            {orderData?.shippingAddress?.pincode}
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewOrder;
