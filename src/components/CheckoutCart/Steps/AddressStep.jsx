import React, { useState } from "react";
import { Button, Card, Input, InputGroup, Label } from "reactstrap";

function AddressStep() {
  const [address, setAddress] = useState({
    fullName: "",
    mobileNumber: "",
    streetAddress: "",
    landmark: "",
    townCity: "",
    pincode: "",
  });
  const cartData = useSelector((state) => state.cart?.cart?.cartItems);
  const totalfee = useSelector((state) => state.cart?.cart?.totalFee);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleSaveAndDeliver = () => {
    // Here, you can perform actions such as sending the address to your server
    // or updating the state in your parent component.
    // You can access the address details in the 'address' state object.
    console.log("Shipping Address:", address);
    // Add your logic here to save and deliver the address.
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
          <div className=" pt-3">
            <Button
              className=" h-100 bg-success border-0 shadow-sm"
              onClick={handleSaveAndDeliver}
            >
              Save and Deliver Here
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AddressStep;
