import Logo from "../../assets/icons/brand_logo.svg";

// ** Custom Components
import InputPasswordToggle from "../Input-password/Index";

// ** Reactstrap Imports
import {
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  Modal,
} from "reactstrap";
import "./Login.scss";
import { useState } from "react";
import Signup from "../SignUp/Signup";
import { X } from "react-feather";
// ** Styles

const Login = () => {
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const openSigUpModal = () => {
    setSignupModalOpen(true);
  };
  return (
    <div className="px-5 pb-2">
      <div className="auth-inner ">
        <div className="mb-0 ">
          <CardBody>
            <div className="d-flex text-center justify-content-center align-items-center">
              <img src={Logo} style={{ width: "200px" }} />
            </div>
            <CardTitle tag="h4" className="mb-1">
              Welcome to GSR HandLooms! 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start the shopping
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="login-email"
                  placeholder="john@gmail.com"
                  autoFocus
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between mt-3">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <small>Forgot Password?</small>
                </div>
                <InputPasswordToggle
                  className="input-group-merge mb-5"
                  id="login-password"
                />
              </div>
              <Button color="primary" block>
                Sign in
              </Button>
            </Form>
            <p className="text-center mt-4">
              <span className="me-2">New on our store?</span>
              <span
                className=""
                onClick={openSigUpModal}
                style={{ cursor: "pointer" }}
              >
                <u>Create an account</u>
              </span>
            </p>
          </CardBody>
        </div>
      </div>
      <Modal isOpen={signupModalOpen} toggle={() => signupModalOpen(false)}>
        <div
          className="d-flex justify-content-end p-4 "
          onClick={() => setSignupModalOpen(false)}
        >
          <X style={{ cursor: "pointer" }} />
        </div>
        <Signup />
      </Modal>
    </div>
  );
};

export default Login;
