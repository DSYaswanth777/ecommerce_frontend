import React from "react";
import { Button, Card, CardBody, CardTitle, Form, Input, Label } from "reactstrap";
import Header from "../Header/Header";
const Profile = () => {
  return (
    
    <div className="">
      <Header />
      <div className="container pt-5 w-50 ">
        <Card className="py-5 px-4 shadow bg-light">
          <CardTitle className="fs-2 text-center fw-bold">My Profile</CardTitle>
          <CardBody>
          <Form className="auth-login-form mt-2">
              <div className="mb-1">
                <Label className="form-label" htmlFor="login-email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="login-email"
                  name="email"
                  placeholder="john@gmail.com"
                  autoFocus
                />
              </div>
              <div className="mb-3">
              <Label className="form-label" htmlFor="login-email">
                  Name
                </Label>
                <Input
                  type="email"
                  id="login-email"
                  name="email"
                  placeholder="Your Name"
                  autoFocus
                />
              </div>
              <div className="mb-3">
              <Label className="form-label" htmlFor="login-email">
                  Mobile Number
                </Label>
                <Input
                  type="email"
                  id="login-email"
                  name="email"
                  disabled
                  placeholder="Mobile Number"
                  autoFocus
                />
              </div>
              <div className="d-flex pt-3 justify-content-center align-items-center w-50 text-center">

              <Button color="success" block type="submit" >
                Update Profile
              </Button>
        
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
