import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { loginAsync } from "../../redux/slice/authSlice"; // Import the loginAsync action
import Logo from "../../assets/icons/brand_logo.svg";
import InputPasswordToggle from "../Input-password/Index";
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
import Signup from "../SignUp/Signup";
import { X } from "react-feather";

const Login = () => {
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const isLoading = useSelector((state) => state.auth.isLoading); // Get isLoading state from Redux
  const user = useSelector((state) => state.auth);
  console.log(user,"I am from Redux Store")
  const openSigUpModal = () => {
    setSignupModalOpen(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Dispatch the loginAsync action with user credentials
    dispatch(loginAsync({ username: email, password }));
  };

  return (
    <div className="px-5 pb-2">
      <div className="auth-inner ">
        <div className="mb-0 ">
          <CardBody>
            <div className="d-flex text-center justify-content-center align-items-center">
              <img src={Logo} style={{ width: "200px" }} alt="Logo" />
            </div>
            <CardTitle tag="h4" className="mb-1">
              Welcome to GSR HandLooms! 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start shopping.
            </CardText>
            <Form className="auth-login-form mt-2" onSubmit={handleLogin}>
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
              <div className="mb-1">
                <div className="d-flex justify-content-between mt-3">
                  <Label className="form-label" htmlFor="login-password">
                    Password
                  </Label>
                  <small>Forgot Password?</small>
                </div>
                <InputPasswordToggle
                  className="input-group-merge mb-5"
                  id="login-password"
                  name="password"
                />
              </div>
              <Button color="primary" block type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
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
      <Modal isOpen={signupModalOpen} toggle={() => setSignupModalOpen(false)}>
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
