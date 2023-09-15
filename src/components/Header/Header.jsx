import React, { useEffect, useRef, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import "./Header.scss";
import Logo from "../../assets/icons/brand_logo.svg";
import NavbarMenu from "../NavbarMenu/NavbarMenu";
import AccountCard from "./AccountCard";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchContainerVisible, setSearchContainerVisible] = useState(false);
  const [isAccountVisible, setAccountVisible] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearchContainer = () => {
    setSearchContainerVisible(!isSearchContainerVisible);
  };
  const toggleAccount = () => {
    setAccountVisible(!isAccountVisible);
  };
  const accountCardRef = useRef(null);
  useEffect(() => {
    if (isAccountVisible) {
      const handleOutsideClick = (event) => {
        if (
          accountCardRef.current &&
          !accountCardRef.current.contains(event.target)
        ) {
          setAccountVisible(false);
        }
      };
      document.addEventListener("click", handleOutsideClick);
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [isAccountVisible]);

  return (
    <div className="header shadow bg-white sticky-top ">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="d-flex gap-3 justify-content-center align-items-center">
            <div className="mobile-menu-icon" onClick={toggleMenu}>
              <RxHamburgerMenu />
            </div>
            <img src={Logo} alt="sds" className="nav_logo" />
          </h2>
          <div className="d-flex gap-3 justify-content-center align-items-center">
            <div className="  " onClick={toggleSearchContainer}>
              <BsSearch size={22} />
            </div>
            <div
              className=" profil "
              onClick={toggleAccount}
              ref={accountCardRef}
            >
              <CgProfile size={22} />
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
            >
              <FiShoppingCart size={22} />
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
