  import React from "react";
  import { Button, Card, Input, InputGroup, Label,CardTitle } from "reactstrap";

  function AddressStep() {
      
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
                <Input type="text" className="w-100" />
              </InputGroup>
              <InputGroup className="d-flex flex-column">
                <Label className="me-3">Mobile Number</Label>
                <Input type="number" className="w-100" min={10} />
              </InputGroup>
            </div>
            <div className="d-flex flex-column flex-sm-row  gap-5 justify-content-center align-items-center">
              <InputGroup className="d-flex flex-column">
                <Label className="me-3">Flat, House No:</Label>
                <Input type="text" className="w-100" />
              </InputGroup>
              <InputGroup className="d-flex flex-column">
                <Label className="me-3">
                  Landmark:
                </Label>
                <Input type="text" min={10} className="w-100" />
              </InputGroup>
            </div>
            <div className="d-flex flex-column flex-sm-row  gap-5 justify-content-center align-items-center">
              <InputGroup className="d-flex flex-column">
                <Label className="me-3">Town/City:</Label>
                <Input type="text" className="w-100" />
              </InputGroup>
              <InputGroup className="d-flex flex-column">
                <Label className="me-3">Pincode:</Label>
                <Input type="number" min={6} className="w-100" />
              </InputGroup>
            </div>
            <div className=" pt-3">
              <Button className=" h-100 bg-success border-0 shadow-sm">Save and Deliver Here</Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  export default AddressStep;
