import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import Logo from "../../assets/icons/brand_logo.svg";
import InputPasswordToggle from "../Input-password/Index";

function ResetPassword() {
  return (
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner my-2">
        <Card className="mb-0 shadow">
          <CardBody>
            {/* <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}> */}
            <div className="d-flex text-center justify-content-center align-items-center">
              <img src={Logo} style={{ width: "200px" }} />
            </div>
            {/* </Link> */}
            <CardTitle tag="h4" className="mb-1">
              Reset Password? 🔒
            </CardTitle>
            <Form
              className="auth-login-form mt-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-1">
                <Label className="form-label" for="ResetPassword-number">
                  Mobile Number
                </Label>
                <Input
                  type="mobile"
                  id="login-email"
                  placeholder="+91 xxxxxxxx "
                  autoFocus
                  disabled
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="ResetPassword-number">
                  OTP
                </Label>
                <Input
                  type="number"
                  id="login-email"
                  placeholder="Enter Your 4 Digits OTP "
                  autoFocus
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between mt-3">
                  <Label className="form-label" for="login-password">
                    New Password
                  </Label>
                  {/* <Link to='/pages/forgot-password-basic'> */}
                  {/* </Link> */}
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                />
              </div>
              <Button color="primary" block className="mb-4 mt-4">
                Reset Password{" "}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ResetPassword;
