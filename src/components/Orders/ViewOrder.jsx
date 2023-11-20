import React, { useState } from "react";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editOrderAsync, viewOrderAsync } from "../../redux/slice/orderSlice";
import { Shimmer } from "react-shimmer";
import { Button, Card } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { ArrowLeft, Copy } from "react-feather";
import { formatDateForInput } from "../../utilities/FormatInputDate";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

function ViewOrder() {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state?.orders?.order?.order);
  const orderStatus = useSelector((state) => state?.orders?.status);
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const userRole = useSelector((state) => state.auth.user?.role);
  useEffect(() => {
    dispatch(viewOrderAsync(orderID));
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, [dispatch, orderID]);

  const handleCopy = (idType) => () => {
    setCopied(true);
    let toastMessage = "";
    if (idType === "orderID") {
      toastMessage = ` ${orderData?.orderID} copied!`;
    } else if (idType === "paymentID") {
      toastMessage = ` ${orderData?.razorpay_payment_id} copied!`;
    } else if (idType === "trackingID") {
      toastMessage = ` ${orderData?.trackingID} copied!`;
    }
    toast.success(toastMessage);
    // Reset the copied state after a short delay
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const [selectedCourier, setSelectedCourier] = useState("");
  const [trackingIdInput, setTrackingIdInput] = useState("");

  const courierOptions = ["DTDC", "Indian Post", "Delhivery.com"];

  const handleCourierChange = (e) => {
    setSelectedCourier(e.target.value);
  };

  const handleTrackingIdChange = (e) => {
    setTrackingIdInput(e.target.value);
  };

  const handleCourierSave = () => {
    dispatch(
      editOrderAsync({
        orderID: orderID,
        courierName: selectedCourier,
        trackingID: trackingIdInput,
      })
    );
  };

  return (
    <>
      <div className="d-flex container flex-column gap-5 pt-3">
        <div className="bg-light shadow-sm border w-100 text-center">
          <div className="d-flex justify-content-start align-items-center gap-2 p-3">
            <ArrowLeft onClick={() => navigate("/orders")} />
            <h5 className=" fs-4 "> Order Details</h5>
          </div>
          <div className="w-100">
            {" "}
            <span className="fw-bold me-2">Order Status: </span>
            {orderData?.paymentStatus === "Successful" ? (
              <p className="text-success fw-bold">
                {" "}
                You have placed your order {orderData?.paymentStatus}ly.
              </p>
            ) : (
              `Your Payment was ${orderData?.paymentStatus} place try again after Some time!`
            )}
          </div>
          {orderStatus === "loading" || orderStatus === "idle" ? (
            <Shimmer visible={true} autoRun={true} width={1300} height={160}>
              <Card
                className="slider-content"
                style={{
                  width: "18rem",
                }}
              ></Card>
            </Shimmer>
          ) : (
            orderData?.cartItems?.map((prod) => (
              <img
                alt={prod?.product?.productName}
                src={prod.product.productImages[0]}
                width={150}
                height={150}
                className="me-3"
                key={uuidv4()}
              />
            ))
          )}
          {orderStatus === "loading" || orderStatus === "idle"
            ? orderData?.cartItems?.map(() => (
                <Shimmer
                  key={uuidv4()}
                  visible={true}
                  autoRun={true}
                  width={1300}
                  height={160}
                >
                  <>
                    <div className="fs-3 text-start fw-bold text-center">
                      <Card width={80} height={20}></Card>
                    </div>
                    <p className="text-muted fs-5 text-center">
                      <Card width={80} height={20}></Card>
                    </p>
                    <p className="text-start fs-5 text-center">
                      <Card width={80} height={20}></Card>
                    </p>
                  </>
                </Shimmer>
              ))
            : orderData?.cartItems?.map((prod) => (
                <div key={uuidv4()}>
                  <div
                    className="fs-3 text-start fw-bold text-center"
                    key={uuidv4()}
                  >
                    {prod?.product?.productName}
                  </div>
                  <p className="text-muted fs-5 text-center">
                    {prod?.product?.subcategoryId?.name}
                  </p>
                  <p className="text-start fs-5 text-center border-bottom">
                    Price: &nbsp;{prod?.quantity} X
                    {formatCurrency(prod?.product?.productPrice)}/-
                  </p>
                </div>
              ))}
          <div>
            {orderStatus === "loading" || orderStatus === "idle" ? (
              <Shimmer visible={true} autoRun={true} width={1300} height={160}>
                <Card width={80} height={60}></Card>
              </Shimmer>
            ) : (
              <>
                <p className="text-muted">
                  Coupon Discount: &nbsp;
                  {formatCurrency(orderData?.couponDiscount)}/-
                </p>
                <h5>Total: &nbsp;{formatCurrency(orderData?.totalAmount)}/-</h5>
              </>
            )}

            <p className="text-mark text-danger text-sm">
              * Includes Delivery Charges{" "}
              {formatCurrency(orderData?.deliveryFee)}
            </p>
          </div>
        </div>
        <div className="bg-light p-3 border h-50  shadow-sm">
          <p>
            {" "}
            <span className="fw-bold me-2">Order Date:</span>
            {formatDateForInput(orderData?.orderDate)}
          </p>
          <p className="text-muted">
            {" "}
            <span className="fw-bold me-2 text-muted">Order ID:</span>
            {orderData?.orderID}
            <CopyToClipboard
              text={orderData?.orderID}
              onCopy={handleCopy("orderID")}
              className="ms-2"
            >
              <Copy className="cursor-pointer " />
            </CopyToClipboard>
          </p>
          <p className="text-muted">
            {" "}
            <span className="fw-bold me-2 text-muted">Payment Id:</span>
            {orderData?.razorpay_payment_id}
            <CopyToClipboard
              text={orderData?.razorpay_payment_id}
              onCopy={handleCopy("paymentID")}
              className="m"
            >
              <Copy className="cursor-pointer" size={15} />
            </CopyToClipboard>
          </p>
          <h6 className="fw-bold text-uppercase">Tracking Details</h6>
          {orderData?.courierName ? (
            <div className="d-flex flex-column">
              <span className="mb-2 fw-bolder">
                Courier Name:&nbsp;{" "}
                <span className="fw-bold">{orderData?.courierName}</span>
              </span>
              <span className="mb-2 ">
                Tracking ID:
                <span className="ms-2">{orderData?.trackingID}</span>
                <CopyToClipboard
                  text={orderData?.trackingID}
                  onCopy={handleCopy("trackingID")}
                  className="ms-2"
                >
                  <Copy className="cursor-pointer" size={16} />
                </CopyToClipboard>
              </span>
            </div>
          ) : (
            <p>You will receive shipment details once your order shipped! </p>
          )}
          {userRole === "admin" && (
            <div className="bg-white p-3 border h-50 w-50 my-4  shadow-sm">
              <div className="d-flex flex-column mb-3 just">
                <label className="fw-bold mb-2">Select Courier:</label>
                <select
                  className="form-select"
                  name="courierName"
                  value={selectedCourier}
                  onChange={handleCourierChange}
                >
                  <option value="" disabled>
                    Select Courier
                  </option>
                  {courierOptions.map((courier) => (
                    <option key={courier} value={courier}>
                      {courier}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="fw-bold mb-2">Enter Tracking ID:</label>
                <input
                  type="text"
                  name="trackingID"
                  className="form-control"
                  value={trackingIdInput}
                  onChange={handleTrackingIdChange}
                />
              </div>

              <Button
                type="button"
                className="btn btn-primary"
                onClick={handleCourierSave}
              >
                Save Courier Details
              </Button>
            </div>
          )}

          <div className="shipping-address">
            <h5 className="text-uppercase">Shipping Address:</h5>
            <div className="d-flex flex-column bg-light p-4 rounded shadow-sm border">
              <span>{orderData?.shippingAddress?.fullName}</span>
              <span>{orderData?.shippingAddress?.landmark}</span>
              <span>{orderData?.shippingAddress?.streetAddress}</span>
              <span>{orderData?.shippingAddress?.townCity}</span>
              {orderData?.shippingAddress?.pincode}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewOrder;
