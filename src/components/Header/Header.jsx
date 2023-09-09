import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { BsSuitHeart } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineUserCircle } from "react-icons/hi";
import {
  Button,
  Input,
  InputGroup,
  Modal,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import Login from "../Login/Login";
import { X } from "react-feather";
import "./Header.scss";

const Header = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header shadow bg-white pt-3 pb-2">
      <div className="container">
        <div className="d-flex justify-content-between gap-5 align-items-center">
          <h2 className="logo logo_text d-flex gap-3 justify-content-center align-items-center">
            <div className="mobile-menu-icon" onClick={toggleMenu}>
              <RxHamburgerMenu />
            </div>
            <div className="">GSR Handlooms</div>
          </h2>
          <div className="d-flex justify-content-center align-items-center gap-5">
            <InputGroup className="input rounded border border-2 border-dark border-2">
              <Input
                type="search"
                name=""
                id=""
                placeholder="Search your product..."
                className="rounded"
              />
            </InputGroup>
            <div className="d-flex gap-3 justify-content-center align-items-center text-center">
              <div
                className="d-flex justify-content-center align-items-center gap-3"
                style={{ cursor: "pointer" }}
              >
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  onClick={openLoginModal}
                >
                  <HiOutlineUserCircle size={25} />
                  <p className="">My Account</p>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <FiShoppingCart size={22} />
                  <p className="">Cart</p>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <BsSuitHeart size={22} />
                  <p className="">Wishlist</p>
                </div>
              </div>
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

      <Offcanvas isOpen={menuOpen} toggle={toggleMenu} scrollable>
        <OffcanvasHeader toggle={toggleMenu} className="text-center">
          GSR Handlooms
        </OffcanvasHeader>
        <OffcanvasBody className="bg-transparent">
          {/* Add your menu items here */}
          <div className="d-flex flex-column justify-content-center align-items-center gap-5 pt-5">
            <div>Home</div>
            <div>About Us</div>
            <div>Products</div>
            <div>Contact Us</div>
            {/* Add more menu items as needed */}
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default Header;
