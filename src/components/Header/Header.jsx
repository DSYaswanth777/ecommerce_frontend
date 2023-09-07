import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { BsSuitHeart } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Input, InputGroup, Modal } from "reactstrap";
import Login from "../Login/Login";
import { X } from "react-feather";
import "./Header.scss";

const Header = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [cartPosition, setCartPosition] = useState({ top: 0, left: 0 });

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleCartHover = (e) => {
    setIsCartHovered(true);
    // Calculate the position of the cart card based on the mouse position
    const x = e.clientX;
    const y = e.clientY;
    setCartPosition({ top: y + 10, left: x + 10 }); // Adjust the values as needed
  };

  const handleCartLeave = () => {
    setIsCartHovered(false);
  };

  return (
    <div className="header shadow p-3 bg-white">
      <div className="container">
        <div className="d-flex justify-content-around align-items-center">
          <h2 className="logo logo_text">
            GSR <span className="fs-3">Handlooms</span>
          </h2>
          <div className="d-flex justify-content-center align-items-center gap-5">
            <InputGroup className="input rounded border border-dark border-2">
              <Input type="search" name="" id="" placeholder="Search" />
            </InputGroup>
            <div
              className="d-flex gap-3 justify-content-center align-items-center"
              onMouseEnter={handleCartHover}
              onMouseLeave={handleCartLeave}
            >
              <div
                className="d-flex justify-content-center align-items-center gap-2"
                onClick={openLoginModal}
                style={{ cursor: "pointer" }}
              >
                <HiOutlineUserCircle size={25} />
                <p className="text-center mt-3 cursor-pointer">SignIn/Join</p>
              </div>
              <div className="cart-icon-container">
                <FiShoppingCart size={22} />
              </div>
              <BsSuitHeart size={22} />
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={loginModalOpen} toggle={() => setLoginModalOpen(false)}>
        <div
          className="d-flex justify-content-end p-4"
          onClick={() => setLoginModalOpen(false)}
        >
          <X style={{ cursor: "pointer" }} />
        </div>
        <Login />
      </Modal>
      {isCartHovered && (
        <div
          className="cart-card"
          style={{ top: cartPosition.top, left: cartPosition.left }}
        >
          <p>Cart Items:</p>
        </div>
      )}
    </div>
  );
};

export default Header;
