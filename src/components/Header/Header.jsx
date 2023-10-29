import React, { useEffect, useState } from "react";
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
import {
  fetchProducts,
  searchProductsAsync,
} from "../../redux/slice/productSlice";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

const Header = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchContainerVisible, setSearchContainerVisible] = useState(false);
  const [isAccountVisible, setAccountVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);
  const searchIcon = document.getElementById("searchBox");
  const profileBox = document.getElementById("profileBox");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const status = useSelector((state) => state.cart?.status);
  const cartData = useSelector((state) => state.cart?.cart?.cartItems);
  const cartTotalFee = useSelector((state) => state.cart?.cart.totalFee);
  const suggestedProducts = useSelector((state) => state?.products?.products);
  useEffect(() => {
    if (isCartVisible && status === "idle") {
      dispatch(fetchUsercartAsync());
    }
  }, [isCartVisible, status, dispatch]);
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
    e.stopPropagation();
  
    if (!user.isAuthenticated) {
      navigate("/login");
      return;
    }
  
    setCartVisible(!isCartVisible);
    if (!isCartVisible) {
      dispatch(fetchUsercartAsync());
    }
  };
  
  document.addEventListener("click", (e) => {
    if (e.target !== searchIcon) {
      setSearchContainerVisible(false);
    }
    if (e.target != profileBox) {
      setAccountVisible(false);
    }
  });

  const debouncedHandleSearch = debounce(() => {
    if (debouncedSearchQuery) {
      dispatch(searchProductsAsync(debouncedSearchQuery));
    }
  }, 300);

  useEffect(() => {
    // Only perform the search when debouncedSearchQuery changes
    if (debouncedSearchQuery) {
      debouncedHandleSearch();
    } else {
      dispatch(fetchProducts());
    }
  }, [debouncedSearchQuery, searchQuery]);
  const cartQuantity = useSelector(
    (state) => state?.cart.cart.cartItems?.length
  );
  const handleSearch = (e) => {
    navigate(`/products?search=${debouncedSearchQuery}`);
  };

  return (
    <div className="header  bg-white sticky-top border-bottom ">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="d-flex gap-3 justify-content-center align-items-center">
            <div className="mobile-menu-icon" onClick={toggleMenu}>
              <RxHamburgerMenu />
            </div>
            <p onClick={() => navigate("/")}>
              {" "}
              <img src={Logo} alt="brand_logo" className="nav_logo" />
            </p>
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
                <Button
                  className="text-white text-center underline-none login-btn"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
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

                <span className=" rounded-circle  cartCount ">
                  {cartData?.length}
                </span>
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
                  <Cart cartData={cartData} cartTotalFee={cartTotalFee} />
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
          <ul className="search-results bg-white py-2 px-2">
            {suggestedProducts?.slice(0, 5)?.map((suggestion, index) => (
              <p
                key={index}
                className="border-bottom border-2 text-left "
                onClick={handleSearch}
              >
                {suggestion?.productName}
              </p>
            ))}
          </ul>
        </div>
      )}
      <NavbarMenu isOpen={menuOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Header;
