import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Input, InputGroup, Label } from "reactstrap";
import {
  placeOrder,
  updatePaymentStatus,
} from "../../../redux/slice/orderSlice";
import GooglePayButton from "@google-pay/button-react";
import { useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
const THIRD_PARTY_API_ENDPOINT = import.meta.env
  .VITE_REACT_THIRD_PARTY_API_ENDPOINT;
const STATE = import.meta.env.VITE_STATE;
function AddressStep() {
  const cartData = useSelector((state) => state?.cart?.cart);
  const [address, setAddress] = useState({
    fullName: "",
    mobileNumber: "",
    streetAddress: "",
    landmark: "",
    pincode: "",
    state: "",
    townCity: "",
  });
  const dispatch = useDispatch();
  const addressRef = useRef(address);
  addressRef.current = address;
  const navigate = useNavigate();
  const [pincodeDetails, setPincodeDetails] = useState(null);
  const [availableOptions, setAvailableOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });

    if (name === "pincode") {
      // Fetch address details when pincode is entered or changed
      fetchAddressDetails(value);
    }
  };


  const fetchAddressDetails = async (pincode) => {
    try {
      const response = await fetch(`${THIRD_PARTY_API_ENDPOINT}${pincode}`);

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const postOfficeOptions = data[0].PostOffice.map(
            (office) => office.Name
          );
          setAvailableOptions(postOfficeOptions);

          setPincodeDetails(data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    // Extract state from the pincodeDetails object
    const selectedOptionDetails = pincodeDetails?.PostOffice.find(
      (office) => office.Name === option
    );
    if (selectedOptionDetails) {
      const selectedState = selectedOptionDetails.State;

      setAddress({
        ...address,
        townCity: option,
        state: selectedState, // Update the state field
      });
    } else {
      setAddress({
        ...address,
        townCity: option,
      });
    }

    // Clear the availableOptions and selectedOption
    setAvailableOptions([]);
    setSelectedOption("");
  };

  const handleGooglePayClick = useCallback(async () => {
    try {
      const orderResponse = await dispatch(placeOrder(addressRef.current));
      console.log(orderResponse)
      if (orderResponse.meta.requestStatus === "fulfilled") {
        const orderId = orderResponse.payload.orderID;
  
        const paymentResponse = await dispatch(
          updatePaymentStatus({ orderID: orderId, paymentStatus: STATE })
        );
  
        if (paymentResponse.meta.requestStatus === "fulfilled") {
          navigate("/");
          return { transactionState: "SUCCESS" };
        } else {
          console.error("Error updating payment status:", paymentResponse.error);
          // Set paymentStatus to "FAILED" when there's an error
          await dispatch(
            updatePaymentStatus({ orderID: orderId, paymentStatus: "FAILED" })
          );
          return { transactionState: "ERROR" };
        }
      } else {
        navigate("/checkout");
        console.error("Error creating the order:", orderResponse.error);
        return { transactionState: "ERROR" };
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      await dispatch(
        updatePaymentStatus({ orderID: orderId, paymentStatus: "FAILED" })
      );
      return { transactionState: "ERROR" };
    }
  }, [dispatch]);
  
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
              <Label className="me-3">Pincode:</Label>
              <Input
                type="number"
                name="pincode"
                className="w-100"
                min={6}
                value={address.pincode}
                onChange={handleInputChange}
              />
              {availableOptions.length > 0 && (
                <div className="d-flex flex-column pt-2 pincodeDetails bg-light w-100 border">
                  {availableOptions.map((option) => (
                    <p
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                      className=" bg-light border-bottom"
                    >
                      {option}
                    </p>
                  ))}
                </div>
              )}
            </InputGroup>
            <InputGroup className="d-flex flex-column">
              <Label className="me-3">Town/City:</Label>
              <Input
                type="text"
                name="townCity"
                className="w-100"
                min={6}
                value={address.townCity}
                onChange={handleInputChange}
              />
            </InputGroup>
          </div>
          <div className="d-flex flex-column flex-sm-row gap-5 justify-content-center align-items-center">
            <InputGroup className="d-flex flex-column">
              <Label className="me-3">State:</Label>
              <Input
                type="text"
                name="state"
                className="w-100"
                min={6}
                value={address.state}
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
                  totalPrice: cartData?.totalFee.toString(),
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
              onCancel={() => {
                toast.error("Payment process was cancelled");
              }}
              onError={(error) => {
                toast.error("Payment Error:", error);                                                                                   
              }}
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
