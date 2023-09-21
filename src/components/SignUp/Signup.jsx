import Logo from "../../assets/icons/brand_logo.svg";
// ** Custom Components
import InputPasswordToggle from "../Input-password/Index";
// ** Reactstrap Imports
import {
  CardTitle, Form,
  Label,
  Input,
  Button
} from "reactstrap";
import "./Signup.scss";


const Signup = () => {
  return (
    <div className="auth-wrapper auth-basic px-2 ">
      <div className="auth-inner my-2">
        <div className="mb-0  p-2">
          <div>
            <div className="d-flex text-center justify-content-center align-items-center">
              <img src={Logo}  />
            </div>
            <CardTitle tag="h4" className="mb-2 mt-3">
              Your Shopping Starts here!🛒
            </CardTitle>
            <Form
              className="auth-login-form mt-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-name">
                  Name
                </Label>
                <Input
                  type="text"
                  id="signup-name"
                  placeholder="Your beautiful name"
                  autoFocus
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="signup-age">
                  Age
                </Label>
                <Input
                  type="number"
                  id="signup-age"
                  placeholder="Enter Your Age"
                  autoFocus
                />
              </div>
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
                  {/* <Link to='/pages/forgot-password-basic'> */}
                  {/* </Link> */}
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between mt-3">
                  <Label className="form-label" for="login-password">
                    Confirm Password
                  </Label>
                </div>
                <InputPasswordToggle
                  className="input-group-merge mb-5"
                  id="login-password"
                />
              </div>
              <Button color="primary" block>
                Sign Up
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-2">Already have an account ?</span>
              <span>
                {" "}
                <a href="/login" className="">Signin Instead</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
