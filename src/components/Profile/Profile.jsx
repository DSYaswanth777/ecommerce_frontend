import React from "react";
import { Button } from "reactstrap";
import OrdersLogo from "../../assets/icons/orders-icon.svg";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import Logo from "../../assets/icons/brand_logo.svg"
import Header from "../Header/Header";
const Profile = () => {
  return (
    <div>
<Header/>
    <div className="container">
      <h3 className="text-center ">My Profile</h3>
      <div className="text-center ">
      <img src={Logo} alt=""/>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center ">
        <div className="d-flex justify-content-end w-50  p-4">
          <div
            className="fs-5 fw-bold text-primary   "
            style={{ cursor: "pointer" }}
          >
            {" "}
            <BiEditAlt size={20} /> Edit Profile
          </div>
        </div>
        <div className="d-flex justify-content-between w-50 border-bottom border-2 p-4 bg-light">
          <div className="fw-bold text-uppercase fs-5">Name: </div>
          <div className="fs-5">Dasari Srinivasa Yaswanth</div>
        </div>
        <div className="d-flex justify-content-between w-50 border-bottom border-2 p-4 bg-light">
          <div className="fw-bold text-uppercase fs-5">Age: </div>
          <div className="fs-5">22</div>
        </div>
        <div className="d-flex justify-content-between w-50  p-4 bg-light">
          <div className="fw-bold text-uppercase fs-5">Email: </div>
          <div className="fs-5">dsyaswanth999@gmail.com</div>
        </div>
        <div className="pt-5 d-flex gap-5">
          <Button className="text-white">
            <a
              href="/changepassword"
              style={{ textDecoration: "none", color: "white" }}
            >
              Change Password
            </a>
          </Button>
          <Button className="p-3">
            {" "}
            <img src={OrdersLogo} alt="" width={25} className="me-2" />
            My Orders <BsFillArrowRightCircleFill size={20} className="ms-2" />
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
