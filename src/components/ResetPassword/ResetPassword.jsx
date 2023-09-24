import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CardBody, CardTitle, Form, Label, Input, Button } from "reactstrap";
import Logo from "../../assets/icons/brand_logo.svg";
import InputPasswordToggle from "../Input-password/Index";
import { useDispatch } from "react-redux";
import { forgotPasswordAsync, resetPasswordAsync } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router";

function ResetPassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      mobile: "",
      otp: "",
      newPassword: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const validationRules = {
    mobile: {
      required: "Mobile number is required",
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Enter a valid 10-digit Indian mobile number",
      },
    },
    otp: {
      required: "OTP is required",
      pattern: {
        value: /^[0-9]{4}$/,
        message: "Enter a valid 4-digit OTP",
      },
    },
    newPassword: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters long",
      },
      maxLength: {
        value: 10,
        message: "Password must not exceed 10 characters",
      },
    },
  };
  const [mobile, setMobile] = useState("");
  const onSubmit = (data) => {
    const { mobile, otp, newPassword } = data;
    const mobileNumber = parseInt(mobile);
    const OTP = parseInt(otp);
    dispatch(resetPasswordAsync({mobile:mobileNumber,otp:OTP,newPassword}))
    .then(() =>{
      navigate('/login')
    })
  };
  const handleOTPGenerate = () => {
    console.log(typeof mobile);
    // const mobileNumber = parseInt(mobile);
    // console.log(mobileNumber)
    dispatch(forgotPasswordAsync({ mobile }));
  };

  return (
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner p-4 signup-content shadow">
        <div className="mb-0">
          <CardBody>
            <div className="d-flex text-center justify-content-center align-items-center">
              <img src={Logo} style={{ width: "200px" }} alt="Logo" />
            </div>
            <CardTitle tag="h4" className="mb-1 mt-5">
              Reset Password? 🔒
            </CardTitle>
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="ResetPassword-number">
                  Enter Your 10-Digit Mobile Number
                </Label>
                <Controller
                  name="mobile"
                  control={control}
                  rules={validationRules.mobile}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        id="forgotPassword-mobile"
                        placeholder="9876543210"
                        autoFocus
                        onChange={(e) => {
                          field.onChange(e); // This ensures that react-hook-form's internal state is updated
                          const mobileNumber = parseInt(e.target.value);
                          setMobile(mobileNumber); // Update the mobile state
                        }}
                      />
                      {errors.mobile && (
                        <span className="error-text text-danger">
                          {errors.mobile.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="py-2 text-end">
                <Button
                  style={{ backgroundColor: "#2b7a8b" }}
                  onClick={handleOTPGenerate}
                >
                  Send OTP
                </Button>
              </div>
              <div className="mb-1">
                <Label className="form-label" for="ResetPassword-number">
                  OTP
                </Label>
                <Controller
                  name="otp"
                  control={control}
                  rules={validationRules.otp}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        type="text"
                        id="forgotPassword-otp"
                        placeholder="Enter Your 4 Digits OTP"
                        autoFocus
                      />
                      {errors.otp && (
                        <span className="error-text text-danger">
                          {errors.otp.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between mt-3">
                  <Label className="form-label" for="login-password">
                    New Password
                  </Label>
                </div>
                <Controller
                  name="newPassword"
                  control={control}
                  defaultValue=""
                  rules={validationRules.newPassword}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      id="login-password"
                      {...field}
                    />
                  )}
                />
                {errors.newPassword && (
                  <span className="text-danger">
                    Password is required, should be between 6 and 10 characters,
                    and must contain at least one digit.
                  </span>
                )}
              </div>
              <Button
                color="success"
                block
                className="mb-4 mt-4 resetPasswordBtn"
                style={{ backgroundColor: "#2b7a8b" }}
                type="submit"
              >
                Reset Password
              </Button>
            </Form>
          </CardBody>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
