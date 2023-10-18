import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Input, InputGroup, Label } from "reactstrap";
import {
  placeOrder,
  updatePaymentStatus,
} from "../../../redux/slice/orderSlice";
import GooglePayButton from "@google-pay/button-react";

function AddressStep() {
  const cartData = useSelector((state) => state?.cart?.cart);
  const [address, setAddress] = useState({
    fullName: "",
    mobileNumber: "",
    streetAddress: "",
    landmark: "",
    townCity: "",
    pincode: "",
  });
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleGooglePayClick = async () => {
    try {
      // Dispatch the placeOrder action to create the order and get the orderID
      const orderResponse = await dispatch(placeOrder(address));
      if (orderResponse.meta.requestStatus === "fulfilled") {
        const orderId = orderResponse.payload.orderID;

        // Dispatch the updatePaymentStatus action with the obtained orderID
        const paymentResponse = await dispatch(
          updatePaymentStatus({ orderID: orderId, paymentStatus: "Successful" })
        );

        if (paymentResponse.meta.requestStatus === "fulfilled") {
          return { transactionState: "SUCCESS" };
        } else {
          // Handle errors in updating payment status
          console.error(
            "Error updating payment status:",
            paymentResponse.error
          );
          return { transactionState: "ERROR" };
        }
      } else {
        // Handle errors in creating the order
        console.error("Error creating the order:", orderResponse.error);
        return { transactionState: "ERROR" };
      }
    } catch (error) {
      // Handle any other unexpected errors
      console.error("An unexpected error occurred:", error);
      return { transactionState: "ERROR" };
    }
  };

  return (
    <div className="container py-5 d-flex flex-column flex-sm-row justify-content-between gap-5">
      <Card className="p-5 w-100">
        <h3>Add New Address</h3>
        <p className="text-muted">
          Be sure to check "Deliver to this address" when you have finished
        </p>
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-column flex-sm-row gap-5 justify-content-center align-items-center">
            <InputGroup className="d-flex flex-column">
              <Label className="me-3">Full name</Label>
              <Input
                type="text"
                name="fullName"
                className="w-100"
                required
                value={address.fullName}
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="d-flex flex-column">
              <Label className="me-3">Mobile Number</Label>
              <Input
                type="number"
                name="mobileNumber"
                className="w-100"
                min={10}
                required
                value={address.mobileNumber}
                onChange={handleInputChange}
              />
            </InputGroup>
          </div>
          <div className="d-flex flex-column flex-sm-row gap-5 justify-content-center align-items-center">
            <InputGroup className="d-flex flex-column">
              <Label className="me-3">Flat/ House No & Street:</Label>
              <Input
                type="text"
                name="streetAddress"
                className="w-100"
                value={address.streetAddress}
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="d-flex flex-column">
              <Label className="me-3">Landmark:</Label>
              <Input
                type="text"
                name="landmark"
                className="w-100"
                min={10}
                required
                value={address.landmark}
                onChange={handleInputChange}
              />
            </InputGroup>
          </div>
          <div className="d-flex flex-column flex-sm-row gap-5 justify-content-center align-items-center">
            <InputGroup className="d-flex flex-column">
              <Label className="me-3">Town/City:</Label>
              <Input
                type="text"
                name="townCity"
                className="w-100"
                required
                value={address.townCity}
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup className="d-flex flex-column">
              <Label className="me-3">Pincode:</Label>
              <Input
                type="number"
                name="pincode"
                className="w-100"
                min={6}
                value={address.pincode}
                onChange={handleInputChange}
              />
            </InputGroup>
          </div>
          <div className=" pt-3 d-flex flex-column ">
            <GooglePayButton
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "Demo Merchant",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: cartData.totalFee.toString(),
                  currencyCode: "INR",
                  countryCode: "US",
                },
                shippingAddressRequired: true,
                callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"],
              }}
              onPaymentDataChanged={() => {
                return {
                  newShippingOptionParameters: {},
                  newTransactionInfo: {
                    totalPriceStatus: "FINAL",
                    totalPrice: cartData.totalFee.toString(),
                    currencyCode: "INR",
                  },
                };
              }}
              onPaymentAuthorized={handleGooglePayClick}
              existingPaymentMethodRequired="false"
              buttonColor="black"
              buttonType="Buy"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AddressStep;
