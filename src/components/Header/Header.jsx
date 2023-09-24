import React, { useEffect, useRef, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import "./Header.scss";
import Logo from "../../assets/icons/brand_logo.svg";
import NavbarMenu from "../NavbarMenu/NavbarMenu";
import AccountCard from "./AccountCard";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchContainerVisible, setSearchContainerVisible] = useState(false);
  const [isAccountVisible, setAccountVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);
  const user = useSelector((state) => state.auth);
  const searchIcon = document.getElementById("searchBox");
  const profileBox = document.getElementById("profileBox");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleSearchContainer = (e) => {
    setSearchContainerVisible(!isSearchContainerVisible);
  };
  const toggleAccount = (e) => {
    setAccountVisible(!isAccountVisible);
    e.stopPropagation();
  };
  const toggleCart = (e) => {
    setCartVisible(!isCartVisible);
    e.stopPropagation();
  };

  document.addEventListener("click", (e) => {
    if (e.target !== searchIcon) {
      console.log("Search");
      setSearchContainerVisible(false);
      // setAccountVisible(false);
    }
    if (e.target != profileBox) {
      console.log("Profile");
      setAccountVisible(false);
    }
  });

  return (
    <div className="header shadow bg-white sticky-top ">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="d-flex gap-3 justify-content-center align-items-center">
            <div className="mobile-menu-icon" onClick={toggleMenu}>
              <RxHamburgerMenu />
            </div>
            <a href="/">
              {" "}
              <img src={Logo} alt="sds" className="nav_logo" />
            </a>
          </h2>
          <div className="d-flex gap-3 justify-content-center align-items-center">
            <div
              className="  "
              id="searchBox"
              onClick={(e) => (toggleSearchContainer(), e.stopPropagation())}
              // ref={SearchCardRef}
            >
              <BsSearch size={22} />
            </div>
            <div className=" profil ">
              {user.isAuthenticated ? (
                <CgProfile
                  size={22}
                  onClick={toggleAccount}
                  id="profileBox"
                  // ref={accountCardRef}
                />
              ) : (
                <div className="text-primary text-center underline-none">
                  <Button color="success" size="md">
                    <a href="/login" className="text-white">
                      Login
                    </a>
                  </Button>
                </div>
              )}
              {isAccountVisible && (
                <div
                  className="card-hover"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AccountCard />
                </div>
              )}
            </div>
            <div
              className="d-flex justify-content-center align-items-center gap-2"
              style={{ cursor: "pointer" }}
              onClick={toggleCart}
              // ref={cartCardRef}
            >
              <FiShoppingCart
                size={22}
                data-bs-toggle="offcanvas"
                data-bs-target="#staticBackdrop"
                aria-controls="staticBackdrop"
              />
              <div
                className="offcanvas offcanvas-end"
                data-bs-backdrop="static"
                tabindex="-1"
                id="staticBackdrop"
                aria-labelledby="staticBackdropLabel"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="staticBackdropLabel">
                    My Cart (2 Items)
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSearchContainerVisible && (
        <div className="container pb-3 d-flex justify-content-center search-container">
          <InputGroup className="d-flex justify-content-center align-items-center input">
            <Input
              type="search"
              name=""
              id=""
              placeholder="Search your product..."
              className="border border-end-0 input-search"
              onClick={(e) => e.stopPropagation()}
            />
            <InputGroupText className="p-2 input-text">
              <BsSearch size={20} className="" />
            </InputGroupText>
          </InputGroup>
        </div>
      )}
      <NavbarMenu isOpen={menuOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Header;
