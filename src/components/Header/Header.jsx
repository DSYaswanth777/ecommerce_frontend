import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";
import "./Header.scss";
import Logo from "../../assets/icons/brand_logo.svg";
import NavbarMenu from "../NavbarMenu/NavbarMenu";
import AccountCard from "./AccountCard";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { User } from "react-feather";
import { fetchUsercartAsync } from "../../redux/slice/cartSlice";

const Header = ({ searchQuery, setDebouncedSearchQuery, setSearchQuery }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchContainerVisible, setSearchContainerVisible] = useState(false);
  const [isAccountVisible, setAccountVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);
  const user = useSelector((state) => state.auth);
  const searchIcon = document.getElementById("searchBox");
  const profileBox = document.getElementById("profileBox");
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleSearchContainer = () => {
    setSearchContainerVisible(!isSearchContainerVisible);
  };
  const toggleAccount = (e) => {
    setAccountVisible(!isAccountVisible);
    e.stopPropagation();
  };
  const toggleCart = (e) => {
    setCartVisible(!isCartVisible);
    dispatch(fetchUsercartAsync());
    e.stopPropagation();
  };
  document.addEventListener("click", (e) => {
    if (e.target !== searchIcon) {
      setSearchContainerVisible(false);
      // setAccountVisible(false);
    }
    if (e.target != profileBox) {
      setAccountVisible(false);
    }
  });

  const cartQuantity = useSelector(
    (state) => state?.cart.cart.cartItems?.length
  );
  return (
    <div className="header  bg-white sticky-top border-bottom ">
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
            >
              <BsSearch size={22} />
            </div>
            <div className=" profile ">
              {user.isAuthenticated ? (
                <User onClick={toggleAccount} id="profileBox" />
              ) : (
                <div className="text-primary text-center underline-none">
                  <div className="login-btn py-2 px-3 rounded">
                    <a href="/login" className="text-white">
                      Login
                    </a>
                  </div>
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
            >
              <div>
                <FiShoppingCart
                  size={22}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#staticBackdrop"
                  aria-controls="staticBackdrop"
                />
              </div>
              <div
                className="offcanvas offcanvas-end"
                data-bs-backdrop="static"
                tabIndex="-1"
                id="staticBackdrop"
                aria-labelledby="staticBackdropLabel"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="staticBackdropLabel">
                    My Cart ({cartQuantity})
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
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setDebouncedSearchQuery(e.target.value);
              }}
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
