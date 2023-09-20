import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { CgProfile } from "react-icons/cg";
import OrdersIcon from "../../assets/icons/orders-icon.svg";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";

import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/slice/authSlice";
import { redirect } from "react-router-dom";
const AccountCard = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    redirect("/login");
  };
  console.log(user);
  return (
    <div>
      {" "}
      <Card className="p-3 card-hover">
        <CardTitle>
          <div
            className="d-flex gap-5 bg-white fw-bold justify-content-center  "
            style={{ cursor: "pointer" }}
          >
            {user.isAuthenticated ? (
              user.user.name
            ) : (
              <a className="text-primary text-center underline-none" href="/login">
                Login
              </a>
            )}
          </div>
        </CardTitle>
        <CardBody>
          <div className="d-flex flex-column justify-content-start align-items-start gap-3">
            <div
              className=" border-bottom border-black pb-2"
              style={{ cursor: "pointer" }}
            >
              {" "}
              <span className="me-2">
                <CgProfile size={20} />
              </span>
              <a href="/profile">My Profile</a>
            </div>
            <div
              className="border-bottom border-black pb-2"
              style={{ cursor: "pointer" }}
            >
              {" "}
              <span className="me-2">
                <img src={OrdersIcon} width={20} height={20} />
              </span>
           <a href="/orders">My Orders</a>  
            </div>
            <div
              className="border-bottom border-black pb-2"
              style={{ cursor: "pointer" }}
            >
              {" "}
              <span className="me-2">
                {" "}
                <BsFillSuitHeartFill />
              </span>
       <a href="/wishlist">Wishlist</a>       
            </div>
            <div
              className="border-bottom border-black pb-2"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              {" "}
              <span className="me-2">
                {" "}
                <IoIosLogOut />
              </span>
              Logout
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AccountCard;
